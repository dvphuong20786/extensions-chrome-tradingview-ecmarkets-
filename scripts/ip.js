$.getJSON("https://api.ipify.org/?format=json", function(e) {
    console.log(e.ip); // lấy ip address của mình
});


$.getJSON("https://api.myip.com", function(data) {
  // Display the visitor's country in the console
  console.log(data.country);  // lấy ip address của mình
});


// lấy về các địa chỉ ip address để sử dụng
// WARNING: this script could be quite long to execute
$.getJSON("https://api.nordvpn.com/server", function(data) {
  var addresses = $.map(data, (d) => d.ip_address);
  // Display all NordVPN addresses in the console
  console.log(addresses);
});


function getListIpAddress(){

    let ip_addresses = [];
    let port_numbers = [];

    request("https://sslproxies.org/", function(error, response, html) {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $("td:nth-child(1)").each(function(index, value) {
        ip_addresses[index] = $(this).text();
        });

        $("td:nth-child(2)").each(function(index, value) {
        port_numbers[index] = $(this).text();
        });
    } else {
        console.log("Error loading proxy, please try again");
    }

    ip_addresses.join(", ");
    port_numbers.join(", ");

    console.log("IP Addresses:", ip_addresses);
    console.log("Port Numbers:", port_numbers);
    });
}

function proxyGenerator() {
    let ip_addresses = [];
    let port_numbers = [];
    let proxy;
  
    request("https://sslproxies.org/", function(error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
  
        $("td:nth-child(1)").each(function(index, value) {
          ip_addresses[index] = $(this).text();
        });
  
        $("td:nth-child(2)").each(function(index, value) {
          port_numbers[index] = $(this).text();
        });
      } else {
        console.log("Error loading proxy, please try again");
      }
  
      ip_addresses.join(", ");
      port_numbers.join(", ");
  
      //console.log("IP Addresses:", ip_addresses);
      //console.log("Port Numbers:", port_numbers);
    });
}


function run(){
    const options = {
        url: "https://www.forextradingbig.com/10-facts-you-must-know-on-online-forex-trading/",
        method: "GET",
        proxy: proxyGenerator()
    };
    
    request(options, function(error, response, html) {
        if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let article_headings = $("h2").text();
        console.log(article_headings);
        } else {
        console.log("Error scraping site, please try again");
        }
    });
}

function getIpAddress(){
        
    let apiKey = '1be9a6884abd4c3ea143b59ca317c6b2';
    $.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
    console.log(JSON.stringify(data, null, 2));
    });

    // Base
    apiKey = 'd9e53816d07345139c58d0ea733e3870';
    $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation?key=' + apiKey, function(data) {
    console.log(JSON.stringify(data, null, 2));
    });

    // Base + Confidence Area
    apiKey = 'd9e53816d07345139c58d0ea733e3870';
    $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation-with-confidence?key=' + apiKey, function(data) {
    console.log(JSON.stringify(data, null, 2));
    });

    // Base + Confidence Area + Hazard Report
    apiKey = 'd9e53816d07345139c58d0ea733e3870';
    $.getJSON('https://api.bigdatacloud.net/data/ip-geolocation-full?key=' + apiKey, function(data) {
    console.log(JSON.stringify(data, null, 2));
    });


    $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    // Convert key-value pairs to JSON
    // https://stackoverflow.com/a/39284735/452587
    data = data.trim().split('\n').reduce(function(obj, pair) {
        pair = pair.split('=');
        return obj[pair[0]] = pair[1], obj;
    }, {});
    console.log(data);
    });



    //Try it: https://api.db-ip.com/v2/free/self    
    $.getJSON('https://api.db-ip.com/v2/free/self', function(data) {
        console.log(JSON.stringify(data, null, 2));
    });
    /*Returns: 
    {
        "ipAddress": "116.12.250.1",
        "continentCode": "AS",
        "continentName": "Asia",
        "countryCode": "SG",
        "countryName": "Singapore",
        "city": "Singapore (Queenstown Estate)"
    }
    */



    //Try it: http://gd.geobytes.com/GetCityDetails
    $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(JSON.stringify(data, null, 2));
    });
    /*Returns: 
    {
    "geobytesforwarderfor": "",
    "geobytesremoteip": "116.12.250.1",
    "geobytesipaddress": "116.12.250.1",
    "geobytescertainty": "99",
    "geobytesinternet": "SA",
    "geobytescountry": "Saudi Arabia",
    "geobytesregionlocationcode": "SASH",
    "geobytesregion": "Ash Sharqiyah",
    "geobytescode": "SH",
    "geobyteslocationcode": "SASHJUBA",
    "geobytescity": "Jubail",
    "geobytescityid": "13793",
    "geobytesfqcn": "Jubail, SH, Saudi Arabia",
    "geobyteslatitude": "27.004999",
    "geobyteslongitude": "49.660999",
    "geobytescapital": "Riyadh ",
    "geobytestimezone": "+03:00",
    "geobytesnationalitysingular": "Saudi Arabian ",
    "geobytespopulation": "22757092",
    "geobytesnationalityplural": "Saudis",
    "geobytesmapreference": "Middle East ",
    "geobytescurrency": "Saudi Riyal",
    "geobytescurrencycode": "SAR",
    "geobytestitle": "Saudi Arabia"
    }*/

    //GeoIPLookup.io
    $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
      console.log(JSON.stringify(data, null, 2));
    });
}