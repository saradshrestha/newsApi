// slugGenerator.js

const { Model } = require('sequelize');

function createSlug(title) {
    return title
    .toLowerCase()                  // Convert to lowercase
    .replace(/[^\w\s-]/g, '')       // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-')            // Replace consecutive hyphens with a single hyphen
    .trim(); 
}

async function createUniqueSlug(title, Model) {
  let slug = createSlug(title);
  let count = 1;
  let uniqueSlug = slug;

  // Check if the slug already exists in the database
  while (await Model.findOne({ where: { slug: uniqueSlug } })) {
    // If it exists, append a unique identifier (e.g., "-2", "-3", etc.)
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  return uniqueSlug;
}

module.exports = {createSlug, createUniqueSlug };