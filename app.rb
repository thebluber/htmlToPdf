#encoding:utf-8
require "sinatra"
enable :sessions

get '/' do
    redirect to "/start"
end

get '/start' do
  erb :start
end

get '/form' do
    erb :form
end

get '/favicon.ico' do
    halt 404
end

post '/validate' do
    session['form'] = params.to_a
    redirect to "/validate"    
end

get '/validate' do
    @formData = {}
    session['form'].each do |el|
      @formData[el[0]] = el[1]
    end
    erb :validate
end

post '/submit' do
    data = {}
    session['form'].each do |el|
      data[el[0]] = el[1]
    end
    person = data["Last Name"] + data["First Name"]
    time = Time.now.strftime("%d_%m_%Y")
    file = open("#{person + time}PersonalDataSheet.fdf", "w")
    file2 = open("#{person}PersonalDataSheet.csv", "w") 
    file.puts "%FDF-1.2
    1 0 obj
    <<
    /FDF
    <<
    /Fields [
    << /V (2012)/T (Text6) >>"
    data.each do |k, v|
      hash = {"ä" => "ae", "Ä" => "Ae", "ü" => "ue", "Ü" => "Ue", "ö" => "oe", "Ö" => "Oe", "ß" => "ss"}
      old_v = v
      match_date = v.match(/([0-9]+)-([0-9]+)-([0-9]+)/)

      if (match_date)
        v = v.gsub("-", "/")
      end

      hash.each{|key, val| v.gsub!(key, val)}
      
      if (k == "DateOfArrival")
        file.puts "<< /V (2012/04/05)/T (DateOfArrival) >>"
      elsif (v != "Ja" || v != "Nein")
        file.puts "<< /V (#{v})/T (#{k}) >>"
      else
        file.puts "<< /V /#{v}/T (#{k}) >>"
      end


      file2.puts "#{k},#{old_v}"
    end
    
    file.puts "]
    >>
    >>
    endobj
    trailer
    
    <<
    /Root 1 0 R
    >>
    %%EOF
    "
    file.close
    %x[pdftk PersonalDataSheetRaw2.pdf fill_form #{person + time}PersonalDataSheet.fdf output ./public/#{person + time}output.pdf]
    #session['file'] = "#{person + time}output.pdf"
    attachment "#{person + time}output.pdf"
end

get '/download' do
  erb :download
end

get '/merkblatt' do
  attachment "Merkblatt07.09.12.pdf"
end

get '/finanz' do
  attachment "Finanzerklaerung07.09.2012.pdf"  
end

get '/gesundheit' do
  attachment "Gesundheitserklaerung07912.pdf"
end

get '/biographicInfo' do
  attachment "BiographicInformation07.09.2012.pdf"
end

get '/selfintro' do
  attachment "Selfintroduction070912.pdf"
end



