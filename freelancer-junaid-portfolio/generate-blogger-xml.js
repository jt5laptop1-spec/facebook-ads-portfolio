
import fs from 'fs';
import path from 'path';

async function generateBloggerXML() {
  const distPath = path.resolve('dist');
  const assetsPath = path.join(distPath, 'assets');

  if (!fs.existsSync(distPath)) {
    console.error('Dist folder not found. Please run npm run build first.');
    return;
  }

  // Read index.html
  let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

  // Find assets
  const files = fs.readdirSync(assetsPath);
  const jsFile = files.find(f => f.endsWith('.js'));
  const cssFile = files.find(f => f.endsWith('.css'));

  const jsContent = fs.readFileSync(path.join(assetsPath, jsFile), 'utf-8');
  const cssContent = fs.readFileSync(path.join(assetsPath, cssFile), 'utf-8');

  // Remove the script and link tags from HTML
  html = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gm, '');
  html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/gm, '');

  // Blogger XML Template
  const xmlTemplate = `<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultmessages='true' b:responsive='true' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/datasource' xmlns:expr='http://www.google.com/2005/gml/expr'>
  <head>
    <meta charset='UTF-8' />
    <meta content='width=device-width, initial-scale=1' name='viewport' />
    <title><data:blog.title/></title>
    <b:skin><![CDATA[
      ${cssContent}
      /* Fix for Blogger layout */
      #navbar-iframe { display: none !important; }
      body { margin: 0; padding: 0; }
    ]]></b:skin>
  </head>
  <body>
    <b:section id='main' showaddelement='no'>
      <b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog'>
        <b:includable id='main'>
          <div id='root'></div>
          <script type='text/javascript'>
            //<![CDATA[
            ${jsContent}
            //]]>
          </script>
        </b:includable>
      </b:widget>
    </b:section>
  </body>
</html>`;

  // Ensure public folder exists
  const publicPath = path.resolve('public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }

  // Write to public folder so it's included in build
  fs.writeFileSync(path.join(publicPath, 'blogger-template.xml'), xmlTemplate);
  
  // Also write to dist for immediate testing
  if (fs.existsSync(distPath)) {
    fs.writeFileSync(path.join(distPath, 'blogger-template.xml'), xmlTemplate);
  }

  console.log('Blogger XML template generated at public/blogger-template.xml');
}

generateBloggerXML();
