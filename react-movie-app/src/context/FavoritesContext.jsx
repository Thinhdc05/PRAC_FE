import { createContext,useContext,useState,useEffect } from "react";

const FavoritesContext=createContext(null);
export function FavoritesProvider({children}){
const [favorites,setFavorites] =useState(()=>{
  try{
    const saved=localStorage.getItem('my_favorites');
    return saved?JSON.parse(saved):[]
  } catch{
    return []
  }
})
useEffect(()=>{
  localStorage.setItem('my_favorites',JSON.stringify(favorites));
},[favorites])
function toggleFavorite(movie){
  if(!movie) return;
  setFavorites((prev)=>{
    const isExisted=prev.some((item)=>item.slug===movie.slug);
    if(isExisted){
      return prev.filter(item=>item.slug!==movie.slug)
    } else{
      return [...prev,movie]
    }
  })
}
function isFavorite(slug){
  return favorites.some((item)=>item.slug===slug)
}
return(
  <FavoritesContext.Provider
  value={{
    favorites,
    totalFavorites:favorites.length,
    toggleFavorite,
    isFavorite
  }}
  >
    {children}
  </FavoritesContext.Provider>
)
}
export function useFavorites(){
  const context=useContext(FavoritesContext)
  if(!context){
    throw new Error(".......loi")
  }
  return context;
}