import React, { useState } from "react";

function RecipeContainer({ recipe, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    directions: recipe.directions,
    photoUrl: recipe.photoUrl,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Handle saving changes
    onEdit(editedRecipe); // Call parent component's onEdit function
    setEditing(false);
  };

  const handleDelete = () => {
    // Handle deleting recipe
    onDelete(recipe.id); // Call parent component's onDelete function
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  return (
    <div className="recipe-container">
      {editing ? (
        <div className="recipe">
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="ingredients"
            value={editedRecipe.ingredients}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="directions"
            value={editedRecipe.directions}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="photoUrl"
            value={editedRecipe.photoUrl}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="recipe">
          <h2>{recipe.title}</h2>
          <p>
            <strong>Description:</strong> {recipe.description}
          </p>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </p>
          <p>
            <strong>Directions:</strong> {recipe.directions}
          </p>
          <img
            src={recipe.photoUrl}
            alt={recipe.title}
            width={300}
            height={300}
          />
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default RecipeContainer;

