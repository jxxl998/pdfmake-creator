/**
 * client side pdf generation
 * 
 * references:
 * https://github.com/bpampuch/pdfmake/issues/1091
 */

var pdfMake = require('pdfmake/build/pdfmake.js');

// contain your font file and convert it to base64 string
// https://pdfmake.github.io/docs/0.1/fonts/custom-fonts-client-side/vfs/
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts;

// define font
pdfMake.fonts = {
	// webfont is customize font name
	webfont: {
      // microsoft-yahei.ttf is already in vfs_font.js file, and it has been imported, so we can use it directly
			normal: "microsoft-yahei.ttf",
			bold: "microsoft-yahei.ttf",
			italics: "microsoft-yahei.ttf",
			bolditalics: "microsoft-yahei.ttf",
	},
};

var docDefinition = {
	defaultStyle: {
    font: 'webfont'
  },
	content: [
    // if you don't need styles, you can use a simple string to define a paragraph
    'This is a standard paragraph, using default style',

    // using a { text: '...' } object lets you set styling properties
    { text: 'This paragraph will have a bigger font', fontSize: 15 },

    // if you set the value of text to an array instead of a string, you'll be able
    // to style any part individually
    {
      text: [
        'This paragraph is defined as an array of elements to make it possible to ',
        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
        'than the rest.'
      ]
    }
  ]
};

var pdfDoc = pdfMake.createPdf(docDefinition);

// server side generation is not allow to download directly 
// pdfDoc.download('./testPdf.pdf')  ✖

// therefore, use buffer
pdfDoc.getBuffer(function(buffer) {
  require('fs').writeFileSync('./testPdf.pdf', buffer);
});
