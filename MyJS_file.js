function autocomplete(inp, arr) {
  
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

var countries = new Array();
autocomplete(document.getElementById("myInput"), countries);

/*************************************************************************************/
    var length;
    function createTable() {
		var arrHead = [' ', 'Tasks To Do', 'Edit', 'Remove'];
		
		length = arrHead.length;
		
        var empTable = document.createElement('table');
        empTable.setAttribute('id', 'empTable'); 

        var tr = empTable.insertRow(-1);
        for (var h = 0; h < arrHead.length; h++) {
            var th = document.createElement('th');    
            th.innerHTML = arrHead[h];
            tr.appendChild(th);
        }

        var div = document.getElementById('cont');
        div.appendChild(empTable);   
    }

var counter=0;

    function addNewRow(newTask) {
        var empTab = document.getElementById('empTable');
        var rowCnt = empTab.rows.length;       
        var tr = empTab.insertRow(rowCnt);     
        tr = empTab.insertRow(rowCnt);
		tr.setAttribute('id', 'row'+counter);

        for (var c = 0; c < 4; c++) {
            var td = document.createElement('td');       
            td = tr.insertCell(c);
            if (c == 0){
                var checked = document.createElement('input');
                checked.setAttribute('type', 'checkbox');
                checked.style.cursor = 'pointer';
                td.appendChild(checked);
            }
            else if (c == length-2) {        
                var button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('value', 'Update');
				        button.setAttribute('class',counter);
                button.setAttribute('onclick', 'updateTask(this)');
                button.setAttribute('id', 'updateBtn');
                button.style.cursor = 'pointer';
                td.appendChild(button);
            }
            else if (c == length-1) {       
                var button = document.createElement('img');
                button.setAttribute('src', 'remove.png');
                button.setAttribute('onclick', 'removeRow(this)');
				        button.setAttribute('class',counter);
                button.setAttribute('height', '20px');
                button.setAttribute('width', '20px');
                button.style.cursor = 'pointer';
                td.appendChild(button);
            }
            else {
                var ele = document.createElement('div');
                ele.setAttribute('value', newTask);
                ele.setAttribute('class', "data"+counter);
				        ele.setAttribute('id','text'+counter);
                ele.innerHTML = newTask;
				        countries.push(newTask);
                td.appendChild(ele);
            }   
        }
		counter++;
    }

    function addRow(){
      document.getElementById("empTable").style.display = "block";
      document.getElementById("searched-item").style.display = "none";
      let newValue = document.getElementById("myInput").value;
      let flag = 0;
      if(newValue != ''){
        if(countries.length > 0){
          for( let i = 0; i < countries.length; i++){ 
           if ( countries[i] == newValue) {
              alert(countries[i]+' already Exists.');
              flag = 1; 
             }
          } 
        }
        if(flag == 0){
          var new_task = document.getElementById("myInput").value;
          addNewRow(new_task);
        }
      }
      else{
        alert('Nothing to Add...');
      }
    }

    function updateTask(el){
      document.getElementById("empTable").style.display = "block";
      document.getElementById("searched-item").style.display = "none";
      let oldVal = document.getElementById("text"+el.className).innerHTML;
      var txt;
        var person = prompt("Please the update:", oldVal);
        if (person == null || person == "") {
          txt = oldVal;
        } else {
          txt = "" + person;
          if(countries.length > 0){
            for( let i = 0; i < countries.length; i++){ 
             if ( countries[i] == txt) {
                alert(countries[i]+' already Exists.');
                txt = oldVal;
               }
            } 
          }
        }
        countries[Number(el.className)] = txt;
        document.getElementById("text"+el.className).innerHTML = txt;
    }
    

    function removeRow(oButton) {
      document.getElementById("empTable").style.display = "block";
      document.getElementById("searched-item").style.display = "none";
      var empTab = document.getElementById('empTable');
		  var removeElement = document.getElementById("text"+oButton.className).innerHTML;
      
      let rowIndx = oButton.parentNode.parentNode.rowIndex;
      for( var i = 0; i < countries.length; i++){ 
			   if ( countries[i] == removeElement) {
          alert(countries[i] + ' is removed.');
				 countries.splice(i, 1); 
			   }
		  empTab.deleteRow(rowIndx);
      }
    }

function searchList(){
  deletOldTable();
  document.getElementById("empTable").style.display = "none";
  let newTable = document.getElementById("searched-item");
  let dataToSearch = document.getElementById("myInput").value;
  let tr = newTable.insertRow(1);
  
  let upDtBtnClssNm;
  let newTableRows = document.getElementById("empTable").getElementsByTagName("tr");

  for ( let i = 1; i < newTableRows.length-1; i++ ) {
    var data = newTableRows[i].getElementsByTagName('td');
    let dataset = newTableRows[i].querySelectorAll("td>div")[0].innerText;
    if(dataset == dataToSearch){
      upDtBtnClssNm = data[2].getElementsByTagName("input")[0].className;
      tr.insertCell(0).innerHTML = '<input type = "checkbox" style = "cursor: pointer;"/>';
      tr.insertCell(1).innerHTML = dataToSearch;
      tr.insertCell(2).innerHTML = '<input type = "button" value = "Update" class = "'+upDtBtnClssNm+'" onclick = "updateTask(this)" id = "updateBtn" style = "cursor: pointer;"/>';          
      tr.insertCell(3).innerHTML = '<img src = "remove.png" onclick = "removeRow(this)" class = "'+upDtBtnClssNm+'" height = "20px" width = "20px" style = "cursor: pointer;"/>';
    }
  }
  if(dataToSearch == ""){
    alert("Nothing to display.");
    document.getElementById("empTable").style.display = "block";
  }else{
    document.getElementById("searched-item").style.display = "block";
  }
}

function deletOldTable(){
  let tblId = document.getElementById("searched-item");
  let tR = tblId.getElementsByTagName("tr");
  let rC = tR.length;
  for(var i=1; i<rC; i++){
    document.getElementById("searched-item").deleteRow(i);
  }
}