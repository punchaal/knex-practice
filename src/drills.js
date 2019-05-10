const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://dunder-mifflin@localhost/knex-practice',
})



function searchByName(searchTerm){
    knexInstance
    .select('id','name','price','category','checked','date_added')
    .from('shopping_list')
    .where('name','ILIKE',`%${searchTerm}%`)
    .then(result=>{
        console.log(result);
    })
}

searchByName('fish')


function paginateProducts(page){
    const productsPerPage = 6
    const offset = productsPerPage * (page -1)
    knexInstance
    .select('id','name','price','category','checked','date_added')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result =>{
        console.log(result)
    })
}


paginateProducts(4)

function getItemsAfterDate(daysAgo){
    knexInstance
    .select('id','name','price','category','checked','date_added')
    .from('shopping_list')
    .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days' :: INTERVAL`,daysAgo)
    )
    .then(result=>{
        console.log(result)
    })
}

getItemsAfterDate(5)

function totalCost(){
    knexInstance
    .select('category')
    .from('shopping_list')
    .count('price as total')
    .groupBy('category')
    .then(result=>{
        console.log('totalCost')
        console.log(result)
    })
}

totalCost()

