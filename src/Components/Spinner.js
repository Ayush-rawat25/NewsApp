import loading  from "./loading.gif";
const Spinner=(props)=> {
    return (
      <div className="text-center">
        <img style={{width:"100px"}}src={loading} alt="loading" />
      </div>
    )
  
}
export default Spinner