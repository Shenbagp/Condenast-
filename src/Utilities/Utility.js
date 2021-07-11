export const ellipses = ( text , cap=85) => {    
    if (text.length > cap){
       return  text.slice(0,cap).concat(" ...");        
    }
    return text; 
}