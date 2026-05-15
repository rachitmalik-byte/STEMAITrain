import https from 'https';
import fs from 'fs';

https.get('https://jumpshare.com/share/RuMYIRo1qVNtSEkMFFXT', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // print out first match of <svg ...</svg>
    const svgMatch = data.match(/<svg[\s\S]*?<\/svg>/);
    if(svgMatch) {
       console.log('Found SVG length: ' + svgMatch[0].length);
       if (svgMatch[0].length < 50000) {
         fs.writeFileSync('src/logo.svg', svgMatch[0]);
       }
    } else {
       console.log('No SVG found inside HTML directly');
    }
    
    // Check for window.downloadLink
    const dlMatch = data.match(/downloadLink":\s*"([^"]+)"/i);
    if (dlMatch) {
      console.log('Download link: ' + dlMatch[1]);
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
