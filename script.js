// Change color to blue when key input
$(document).ready(function(){
    $("input").keydown(function(){
        $("input").css("background-color", "#4ad2ff");
    });
    $("input").keyup(function(){
        $("input").css("background-color", "#dfdfd0");
    });
});


$(document).ready(function(){
    $("h4").click(function(){
        $(this).hide();
    });
});


//UTC Date Function
function utcDate() {
    var d = new Date();
    var n = d.toUTCString();
    document.getElementById("utc").innerHTML = n;
}

//Searchable on <tr>
$(document).ready(function(){ $("#myInput").on("keyup", function() { var value = $(this).val().toLowerCase(); $("#myTable tr").filter(function() { $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) }); }); });

"use strict";
(function defineVarsFromClassName() {
		var needVar = $("[class]"),
				definedVars = "",
				i,
				ii,
				classes,
				sVarName,
				sClassName,
				$this,
				$us;
		for (i = 0; i < needVar.length; i++) {
				$this = $(needVar[i]);
				classes = $this.attr("class").split(" ");
				for (ii = 0; ii < classes.length; ii++) {
						sClassName = $.trim(classes[ii]);
						if (sClassName.length > 0) {
								$us = $("." + sClassName);
								sVarName = "$" + sClassName.replace(/\-/g, "_");
								if (typeof window[sVarName] === "undefined") {
										window[sVarName] = $us;
										definedVars += " " + sVarName;
								}
						}
				}
		}
		return definedVars;
})();

function getDelim() {
	var seperator = document.getElementById("myDelim").value;
	document.getElementById("Printdelim").innerHTML = "Delimiter defined as: " + seperator
	return seperator;
}

// INCLUDE FROM HERE - csvToHtml

/**
 * Converts a CSV string to object with rows and header
 * @param   {String} sCSV    A CSV string
 * @param   {Object} options {
 *                         seperator: string "The CSV col selerator" [","]
 *                         hasHeader: bool [true]
 *                         headerPrefix: string ["COL]  }
 * @returns {Object} {
 * headers: array of headers,
 * rows: array of rows (including header)
 *  }
 */
function convertToArray(sCSV, options) {
		var result = {
						headers: null,
						rows: null
				},
				firstRowAt = 0,
				tds,
				first,
				cols;
		options = options || {};
		options = $.extend(options, {
      // DEFINE SEPERATOR
				seperator: getDelim(),
				hasHeader: true,
				headerPrefix: "COL"
		});

		// Create header
		tds = sCSV.split("\x0a");
		first = tds[0].split(options.seperator);
		if (options.hasHeader) {
				result.headers = first;
				result.headers = result.headers.map(function(header) {
						return header.replace(/\//g, "_");
				});
				firstRowAt = 1;
		} else {
				result.headers = first.map(function(header, i) {
						return options.headerPrefix + i;
				});
		}

		// Create rows
		cols = result.headers.length;
		result.rows = tds.map(function(row, i) {
				return row.split(options.seperator);
		});
		return result;
}

function tag(element, value) {
		return "<" + element + ">" + value + "</" + element + ">";
}

function toHTML(arr) {
		var sTable = "<table class=\"table table-striped\"><thead>";
		arr.map(function(row, i) {
				var sRow = "";
				row.map(function(cell, ii) {
						var tagname = (i === 0) ? "th" : "td";
						sRow += tag(tagname, cell);
				});

				sTable += tag("tr", sRow) + ((i === 0) ? "</thead><tbody id=myTable>" : "");
		});
		return sTable + "</tbody></table>";
}

function csvToHtml($source, $output, options) {
				var sCSV = $source.val(),
						result = convertToArray(sCSV, options || {});
				$output.html(toHTML(result.rows));
		}
		// INCLUDE TO HERE - csvToHtml

$source.on("change keyup touchend", function() {
		csvToHtml($source, $output);
});

// This is how you can use the code
csvToHtml($source, $output);


//export Table To CSV
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file "\ufeff" made it in UTF 8 (suppors ижбщдЯЪЦ
    csvFile = new Blob(["\ufeff", csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}