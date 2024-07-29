//get total
//create 
//save localstorage
//clear inputs
//read
//count
//delete
//update
//search
//clean data
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let count=document.getElementById('count');
let category=document.getElementById('category');
let total=document.getElementById('total');
let submit=document.getElementById('submit');
let mood = 'create';
let temp;
let moodsearch='title';

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background='#040';
    }
    else{
        total.innerHTML=' ';
        total.style.background='#a00d02'
    }
}
let dataPro;
if(localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

submit.onclick=function(){
    let newPro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value !=' ' && price.value !=' ' && category.value !=' ' && count.value<=100){
            if(mood==='create'){
            if(newPro.count >1 ){
            for(let i=0;i<newPro.count ; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        }else{
            dataPro[ temp]=newPro;
            mood= 'create';
            submit.innerHTML='Create';
            count.style.display='block';
            total.style.background='#a00d02'
        } 
        
    }
    
    localStorage.setItem('product',JSON.stringify(dataPro))
    clear();
    showdata();
}
function clear(){
    title.value=' ';
    price.value=' ';
    taxes.value=' ';
    ads.value=' ';
    discount.value=' ';
    total.innerHTML=' ';
    count.value=' ';
    category.value=' ';

}
function showdata(){
    let table ='';
    for(let i=0; i< dataPro.length;i++){
        table +=`
        <tr>
                    <th>${i+1}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="update(${i})" id='update'>update</button></th>
                    <th><button onclick="deletedata(${i})" id='delete'>delete</button></th>
                    
                    
        </tr>
        `;

    }
    document.getElementById('tbody').innerHTML= table;
    let btndelete = document.getElementById('deleteall')
    if(dataPro.length > 0){
        btndelete.innerHTML=`
        <button onclick="deleteall()">Delete All (${dataPro.length})</button>
        `

    }
    else{
        btndelete.innerHTML = '';
    }
}
showdata();

function deletedata(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showdata();

}

function deleteall(){
    localStorage.clear();
    dataPro.splice(0);
    showdata();
}
function update(i){
    title.value= dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    count.style.display = 'none';
    category.value=dataPro[i].category;
    submit.innerHTML = 'Update';
    mood='update';
    temp= i;
    scroll({
        top:0,
        behavior:'smooth',
    })

    getTotal();
    
}
function getsearch(id){
    if(id=='searchtitle'){
        moodsearch='title';
        search.placeholder='Search by title';
    }else{
        moodsearch='category';
        search.placeholder='Search by category';
    }
    search.focus();

}

function searchData(value){
    let table='';
    if(moodsearch == 'title'){
        for(let i=0;i< dataPro.length ;i++){
            if(dataPro[i].title.includes(value)){
                table += `
        <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="update(${i})" id='update'>update</button></th>
                    <th><button onclick="deletedata(${i})" id='delete'>delete</button></th>
                    
                    
        </tr>
        `;

            }
            
        }
           
    }
    else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value)){
                table +=`
        <tr>
                    <th>${i}</th>
                    <th>${dataPro[i].title}</th>
                    <th>${dataPro[i].price}</th>
                    <th>${dataPro[i].taxes}</th>
                    <th>${dataPro[i].ads}</th>
                    <th>${dataPro[i].discount}</th>
                    <th>${dataPro[i].total}</th>
                    <th>${dataPro[i].category}</th>
                    <th><button onclick="update(${i})" id='update'>update</button></th>
                    <th><button onclick="deletedata(${i})" id='delete'>delete</button></th>
                    
                    
        </tr>
        `;
            }
            
        }
           
    }
    document.getElementById('tbody').innerHTML = table;   
    
}