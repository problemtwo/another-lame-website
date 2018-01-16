const print = (function(x){
 [...document.getElementsByClassName('output')][0].contentWindow.document.innerHTML = 
 '<p>' + x + '<br /></p>';
});

window.onload = function() {
 let files = {'test':''};
 let currentFile = 'test';
 
 function dictSort(d){
  let keys = [];
  for(let k in d){keys.push(k);}
  keys.sort();
  let d2 = {};
  for(let k of keys){d2[k] = d[k];}
  return d2;
 }
 
 function save(e){
  if(e.keyCode === 13){
   e.preventDefault();
   if(document.getElementById('flname') !== undefined){
    if(files[document.getElementById('flname').value] === undefined){
     console.log('it works!');
     files[document.getElementById('flname').value] = '';
     updateFiles();
    }
    files[currentFile] = [...document.getElementsByClassName('code')][0].value;
    [...document.getElementsByClassName('code')][0].value =
            files[document.getElementById('flname').value];
    currentFile = document.getElementById('flname').value
   }
  }
 };
 
 function updateFiles(){
  [...document.getElementsByClassName('files')][0].innerHTML = '';
  for(var file in dictSort(files)){
   [...document.getElementsByClassName('files')][0].innerHTML += '<p>&nbsp;> ' + file + '<br /></p>'
  }
  document.getElementById('filename').innerHTML =
                       '<p>filename: </p><textarea id="flname">'
                       + currentFile
                       + '</textarea>';
  document.getElementById('flname').onkeydown = save;
 }
 updateFiles();
 
 [...document.getElementsByClassName('code-html')].forEach(function(el){
  el.onkeydown = function(e) {
   if(e.keyCode === 9){
    const start = e.target.selectionStart, end = e.target.selectionEnd;
    e.target.value = e.target.value.substr(0,start) + ' ' + e.target.value.substr(end);
    e.target.selectionStart = e.target.selectionEnd = start + 1;
    e.preventDefault();
   }
  };
 });
 
 [...document.getElementsByClassName('code-js')].forEach(function(el){
  el.onkeydown = function(e) {
   if(e.keyCode === 9){
    const start = e.target.selectionStart, end = e.target.selectionEnd;
    e.target.value = e.target.value.substr(0,start) + ' ' + e.target.value.substr(end);
    e.target.selectionStart = e.target.selectionEnd = start + 1;
    e.preventDefault();
   }
  };
 });
 
 [...document.getElementsByClassName('title')].forEach(function(el){
  el.onclick = function(){
   document.getElementsByClassName('active')[0].classList.remove('active');
   el.classList.add('active');
   let idx = Math.floor([...document.getElementsByClassName('title')].indexOf(el)/3);
   if(el.classList.contains('t-code')){
    [...document.getElementsByClassName('code-html')][0].style.zIndex = 3;
    [...document.getElementsByClassName('code-css')][0].style.zIndex = 3;
    [...document.getElementsByClassName('code-js')][0].style.zIndex = 3;
    [...document.getElementsByClassName('output')][0].style.zIndex = 2;
    [...document.getElementsByClassName('files')][0].style.zIndex = 1;
   }else if(el.classList.contains('t-output')){
    [...document.getElementsByClassName('files')][0].style.zIndex = 1;
    [...document.getElementsByClassName('code-html')][0].style.zIndex = 2;
    [...document.getElementsByClassName('code-css')][0].style.zIndex = 2;
    [...document.getElementsByClassName('code-js')][0].style.zIndex = 2;
    [...document.getElementsByClassName('output')][0].style.zIndex = 3;
    try{
     [...document.getElementsByClassName('output')][0].contentWindow.document.body.innerHTML = '';
     [...document.getElementsByClassName('output')][0].contentWindow.document.write(
      [...document.getElementsByClassName('code-html')][0].value);
     (0,eval)([...document.getElementsByClassName('code-js')][0].value);
    }catch(ex){(([...document.getElementsByClassName('output')][0]
               .contentWindow.document) || ([...document.getElementsByClassName('output')][0].contentDocument)).body.innerHTML =
               '<p style="color:#fff">' + ex.message + '</p>';}
   }else if(el.classList.contains('t-files')){
    [...document.getElementsByClassName('files')][idx].style.zIndex = 3;
    [...document.getElementsByClassName('code-html')][idx].style.zIndex = 2;
    [...document.getElementsByClassName('code-css')][idx].style.zIndex = 2;
    [...document.getElementsByClassName('code-js')][idx].style.zIndex = 2;
    [...document.getElementsByClassName('output')][idx].style.zIndex = 1;
   }
  };
 });
 
 document.getElementById('filereader').onchange = function(e){
  let reader = new FileReader();
  reader.onload = function(evt){
   files = JSON.parse(evt.target.result);
   for(let k in files){
    currentFile = k;
    break;
   }
   [...document.getElementsByClassName('code')][0].value = files[currentFile];
  };
  reader.readAsText(e.target.files[0]);
 }
 
 let ctrl = false;
 window.onkeydown = function(e){
  if(e.keyCode === 17){
   ctrl = true;
  }else if(e.keyCode === 219 && ctrl === true){
   save({'keyCode':13,'preventDefault':function(){}});
   const a = document.createElement('a');
   a.setAttribute('download','profile.lame');
   a.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(files)));
   a.style.display = 'none';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   ctrl = false;
  }else if(e.keyCode === 221 && ctrl === true){
   document.getElementById('filereader').click();
   ctrl = false;
  }
 };
 window.onkeyup = function(e){
  if(e.keyCode === 17){ctrl = false;}
 };
};
