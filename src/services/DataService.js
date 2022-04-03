import http from "../http-common";
const getAll = () => {
  return http.get("/usersall");
};
const get = id => {
  let data = {
    idcode:id
  } 
  return http.post(`/getusersbyidcode`, data);
};
const create = data => {
  return http.post("/userscreate", data);
};
const update = (id, data) => {
  return http.post(`/usersupdate`, data);
};
const remove = id => {
  let data = {
    idcode:id
  } 
  return http.post(`/usersdelete`, data);
};
const findByTitle = title => {

  let data ={
    title:title
  }

  return http.post(`/getusersbytitle`, data);
};
const DataService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle
};
export default DataService;