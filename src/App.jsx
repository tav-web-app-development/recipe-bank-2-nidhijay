import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import RecipeContainer from "./Components/RecipeContainer";
import "./assets/style.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/recipes/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (recipeId) => {
    setEditingRecipeId(recipeId);
  };

  const handleSave = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    setEditingRecipeId(null);
  };

  const handleDelete = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar scrollToBottom={scrollToBottom} />
      {recipes.map((recipe) => (
        <RecipeContainer
          key={recipe.id}
          recipe={recipe}
          editing={editingRecipeId === recipe.id}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ))}
      <Footer />
    </>
  );
}

export default App;

