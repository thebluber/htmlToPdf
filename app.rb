#encoding:utf-8
require "sinatra"
require "cgi"
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
    data = {}
    session['form'].each do |el|
      data[el[0]] = el[1]
    end
    person = data["Last Name"] + data["First Name"]
    data["IntendedPeriod"] += " months"
    data["Katakana"] = data["Katakana"].unpack('U*').map{ |i| "&#x" + i.to_s(16).rjust(4, '0').upcase }.join(";") + ";"
    time = Time.now.strftime("%d_%m_%Y")
    file = open("#{person + time}PersonalDataSheet.xfdf", "w")
    file2 = open("#{person}PersonalDataSheet.csv", "w") 
    file.puts "<?xml version='1.0' encoding='UTF-8'?>
  <xfdf xmlns='http://ns.adobe.com/xfdf/' xml:space='preserve'>
  <f href='PersonalDataSheetRaw2.pdf'/>
  <fields>
    <field name='Text6'>
      <value>2012</value>
    </field>
    <field name='DateOfArrival'>
      <value>2012/04/05</value>
    </field>"
    data.each do |k, v|
      hash = {"ä" => "ae", "Ä" => "Ae", "ü" => "ue", "Ü" => "Ue", "ö" => "oe", "Ö" => "Oe", "ß" => "ss"}
      old_v = v
      match_date = v.match(/([0-9]+)-([0-9]+)-([0-9]+)/)

      if (match_date)
        v = v.gsub("-", "/")
      end

      hash.each{|key, val| v.gsub!(key, val)}
      file.puts "<field name='#{k}'><value>#{v}</value></field>"      
      file2.puts "#{k},#{old_v}"
    end
    
    file.puts "</fields><ids original='3960E6432781FA8EA1642785B0B3B659' modified='291C88F0210F49448C059C53102ECB1D'/></xfdf>"
    file.close
    %x[pdftk PersonalDataSheetRaw3.pdf fill_form #{person + time}PersonalDataSheet.xfdf output ./public/#{person + time}output.pdf]
    session['formPDF'] = "#{CGI::escape(person + time)}output.pdf"
    redirect to "/validate"    
end

get '/validate' do
    @formData = {}
    session['form'].each do |el|
      @formData[el[0]] = el[1]
    end
    erb :validate
end

get '/download/output' do
    #session['file'] = "#{person + time}output.pdf"
    redirect to session['formPDF']
end

get '/download' do
  erb :download
end

get '/download/merkblatt' do
  redirect to "Merkblatt07.09.12.pdf"
end

get '/download/finanz' do
  redirect to "Finanzerklaerung07.09.2012.pdf"  
end

get '/download/gesundheit' do
  redirect to "Gesundheitserklaerung07912.pdf"
end

get '/download/biographicInfo' do
  redirect to "BiographicInformation07.09.2012.pdf"
end

get '/download/selfintro' do
  redirect to "Selfintroduction070912.pdf"
end

