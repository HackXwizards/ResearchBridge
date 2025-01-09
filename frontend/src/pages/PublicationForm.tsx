import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicationService } from "@/services/publicationService";
import toast from "react-hot-toast";

const PublicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    authors: [""],
    journal: "",
    year: new Date().getFullYear(),
    citations: 0,
    tags: [""],
    description: "",
    introduction: "",
    methodology: "",
    results: "",
    future_scope: "",
    references: [""],
    doi: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (
    index: number,
    field: "authors" | "tags" | "references",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "authors" | "tags" | "references") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    index: number,
    field: "authors" | "tags" | "references"
  ) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Format the data according to your backend requirements
      const publicationData = {
        ...formData,
        id: Date.now().toString(), // Generate a unique ID
        year: Number(formData.year),
        citations: Number(formData.citations),
        // Filter out empty strings from arrays
        authors: formData.authors.filter((author) => author.trim() !== ""),
        tags: formData.tags.filter((tag) => tag.trim() !== ""),
        references: formData.references.filter((ref) => ref.trim() !== ""),
      };

      await publicationService.createPublication(publicationData);
      toast.success("Publication created successfully!");
      navigate("/publications"); // Redirect to publications list
    } catch (err) {
      setError("Failed to create publication. Please try again.");
      toast.error("Failed to create publication. Please try again.");
      console.error("Error creating publication:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 mt-20 text-center">
        Create New Publication
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Authors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Authors
          </label>
          {formData.authors.map((author, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={author}
                onChange={(e) =>
                  handleArrayInputChange(index, "authors", e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
                placeholder="Author name"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "authors")}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("authors")}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Author
          </button>
        </div>

        {/* Journal & Year */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Journal
            </label>
            <input
              type="text"
              name="journal"
              value={formData.journal}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) =>
                  handleArrayInputChange(index, "tags", e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
                placeholder="Research tag"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "tags")}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("tags")}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Tag
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>

        {/* Introduction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Introduction
          </label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>

        {/* Methodology */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Methodology
          </label>
          <textarea
            name="methodology"
            value={formData.methodology}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>

        {/* Results */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Results
          </label>
          <textarea
            name="results"
            value={formData.results}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>

        {/* Future Scope */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Future Scope
          </label>
          <textarea
            name="future_scope"
            value={formData.future_scope}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            rows={3}
            required
          />
        </div>

        {/* References */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            References
          </label>
          {formData.references.map((reference, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={reference}
                onChange={(e) =>
                  handleArrayInputChange(index, "references", e.target.value)
                }
                className="flex-1 p-2 border rounded-md"
                placeholder="Reference"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "references")}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("references")}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Reference
          </button>
        </div>

        {/* DOI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            DOI
          </label>
          <input
            type="text"
            name="doi"
            value={formData.doi}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSubmitting ? "Creating..." : "Create Publication"}
        </button>
      </form>
    </div>
  );
};

export default PublicationForm;
