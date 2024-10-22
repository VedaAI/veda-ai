
export const storeData = (key, value) => {
    if (typeof window !== 'undefined') {
  
        localStorage.setItem(key, JSON.stringify(value));
        
      }
    };
    
    export const getData = (key) => {
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : "Data not stored";
      }
      return "Error";
    };
    
    export const removeData = (key) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    };
    