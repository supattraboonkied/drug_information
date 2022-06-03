function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/drugs");
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = ''; 
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td>'+object['drugcode']+'</td>';
        trHTML += '<td>'+object['drugname']+'</td>';
        trHTML += '<td>'+object['lotno']+'</td>';
        trHTML += '<td>'+object['max']+'</td>';
        trHTML += '<td>'+object['min']+'</td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showDrugEditBox('+object['drugcode']+')">Edit</button>';
        trHTML += '<button type="button" class="btn btn-outline-danger" onclick="drugDelete('+object['drugcode']+')">Del</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();

function showDrugCreateBox() {
  Swal.fire({
    title: 'Create Drug',
    html:
      '<input id="id" class="swal2-input" placeholder="ID">' +
      '<input id="drugcode" class="swal2-input" placeholder="Drugcode">' +
      '<input id="drugname" class="swal2-input" placeholder="Drugname">' +
      '<input id="lotno" class="swal2-input" placeholder="Lotno">' +
      '<input id="max" class="swal2-input" placeholder="Max">' +
      '<input id="min" class="swal2-input" placeholder="Min">',
    focusConfirm: false,
    preConfirm: () => {
      drugCreate();
    }
  })
}

function drugCreate() {
  const id = document.getElementById("id").value;
  const drugcode = document.getElementById("drugcode").value;
  const drugname = document.getElementById("drugname").value;
  const lotno = document.getElementById("lotno").value;
  const max = document.getElementById("max").value;
  const min = document.getElementById("min").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/drugs/create");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "drugcode": drugcode, "drugname": drugname, "lotno": lotno, "max": max, "min": min
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}

function drugDelete(drugcode) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/drugs/delete");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "drugcode": drugcode
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    } 
  };
}

function showDrugEditBox(drugcode) {
  console.log(drugcode);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/drugs/"+drugcode);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      const drug = objects['drugcode'];
      console.log(drug);
      Swal.fire({
        title: 'Edit Drug',
        html:
          '<input id="id" class="swal2-input" placeholder="ID" value="'+drug['id']+'" disabled>' +
          '<input id="drugcode" class="swal2-input" placeholder="Drugcode" value="'+drug['drugcode']+'" disabled>' +
          '<input id="drugname" class="swal2-input" placeholder="Drugname" value="'+drug['drugname']+'">' +
          '<input id="lotno" class="swal2-input" placeholder="Lotno" value="'+drug['lotno']+'">' +
          '<input id="max" class="swal2-input" placeholder="Max" value="'+drug['max']+'">' +
          '<input id="min" class="swal2-input" placeholder="Min" value="'+drug['min']+'">',
        focusConfirm: false,
        preConfirm: () => {
          drugEdit();
        }
      })
    }
  };
}

function drugEdit() {
  const id = document.getElementById("id").value;
  const drugcode = document.getElementById("drugcode").value;
  const drugname = document.getElementById("drugname").value;
  const lotno = document.getElementById("lotno").value;
  const max = document.getElementById("max").value;
  const min = document.getElementById("min").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/drugs/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "drugcode": drugcode, "drugname": drugname, "lotno": lotno, "max": max, "min": min
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}
