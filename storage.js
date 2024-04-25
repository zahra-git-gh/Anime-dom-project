
    function setData(data) {
      localStorage.setItem('user', JSON.stringify(data.id));
    }
  
    function getDataStorage(term) {
      const data = localStorage.getItem(term);
      return JSON.parse(data);
    }
  
    function removeData() {
      localStorage.removeItem('user');
    }
    function setSearch(data) {
      localStorage.setItem('search', JSON.stringify(data));
    }
    function removeDataSearch() {
      localStorage.removeItem('search');
    }
  
  export { setData ,getDataStorage ,removeData, setSearch, removeDataSearch };