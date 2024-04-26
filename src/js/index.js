// http://localhost:3000/transactions

const trnsactionBtn=document.querySelector(".transactions-btn");
const transactionsBody=document.querySelector("#transactions__body");
const transactionsList=document.querySelector(".transactions-list");
const sortPrice=document.querySelector("#sort-price");
const sortDate=document.querySelector("#sort-date");
const searchForm=document.querySelector(".search-form");

let transactions=[];

document.addEventListener("DOMContentLoaded",()=>{
    transactionsList.classList.add("hidden");
    searchForm.classList.add("hidden");
});

trnsactionBtn.addEventListener("click",()=>{
    axios
    .get(`http://localhost:3000/transactions`)
    .then((res)=>{
        transactions=res.data;
        //render transactions on DOM
        transactionsList.classList.remove("hidden");
        trnsactionBtn.classList.add("hidden");
        searchForm.classList.remove("hidden");
        showTransactions(transactions);
    })
    .catch((err)=>console.log(err));
});

sortPrice.addEventListener("click",()=>{
    if(sortPrice.classList.contains("fa-chevron-down")){
        axios
        .get(`http://localhost:3000/transactions?_sort=price&_order=desc`)
        .then((res)=>{
            transactions=res.data;
            showTransactions(transactions);
            sortPrice.classList.remove("fa-chevron-down");
            sortPrice.classList.add("fa-chevron-up");
        })
        .catch((err)=>console.log(err));

    }
    if(sortPrice.classList.contains("fa-chevron-up")){
        axios
        .get(`http://localhost:3000/transactions?_sort=price&_order=asc`)
        .then((res)=>{
            transactions=res.data;
            showTransactions(transactions);
            sortPrice.classList.remove("fa-chevron-up");
            sortPrice.classList.add("fa-chevron-down");
        })
        .catch((err)=>console.log(err));
    }
});

sortDate.addEventListener("click",()=>{
    if(sortDate.classList.contains("fa-chevron-down")){
        axios
        .get(`http://localhost:3000/transactions?_sort=date&_order=desc`)
        .then((res)=>{
            transactions=res.data;
            showTransactions(transactions);
            sortDate.classList.remove("fa-chevron-down");
            sortDate.classList.add("fa-chevron-up");

        })
        .catch((err)=>console.log(err));

    }
    if(sortDate.classList.contains("fa-chevron-up")){
        axios
        .get(`http://localhost:3000/transactions?_sort=date&_order=asc`)
        .then((res)=>{
            transactions=res.data;
            showTransactions(transactions);
            sortDate.classList.remove("fa-chevron-up");
            sortDate.classList.add("fa-chevron-down");

        })
        .catch((err)=>console.log(err));
    }
});

searchForm.addEventListener("input",(e)=>{
    const searchItem=e.target.value;
    e.preventDefault();
    axios
        .get(`http://localhost:3000/transactions?refId_like=${searchItem}`)
        .then((res)=>{
            transactions=res.data;
            showTransactions(transactions);
        })
        .catch((err)=>console.log(err));
});

function showTransactions(_transactions){
    let result="";
    _transactions.forEach((item) => {
        result+=`<tr>
        <td class="row-num">${item.id}</td>
        <td class="transaction-type ${item.type=== 'برداشت از حساب' ? "color-red" : "color-green"}">${item.type}</td>
        <td class="transaction-price">${item.price}</td>
        <td class="transaction-tracking">${item.refId}</td>
        <td class="transaction-date">${new Date(item.date).toLocaleString("fa-IR")}</td>
      </tr>`
      
    });
    transactionsBody.innerHTML=result;
};
