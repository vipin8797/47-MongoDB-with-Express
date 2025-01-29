
//function to handle asynchronouse errors.
const asyncWrap = (fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{ next(err)});
    }
}

module.exports = asyncWrap;