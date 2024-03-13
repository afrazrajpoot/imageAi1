import React from 'react';

const App = () => {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  function handleFile(e) {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  async function callApi(formData) {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/removeBackground/api/v1/createImage', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setError("Something went wrong");
      } else {
        setSuccess(true);
      }
      
      console.log(data);
    } catch (error) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageUrl', image);
    await callApi(formData);
  }

  return (
    <div className="container mx-auto mt-10 flex flex-col items-center">
      <div className="bg-red-500 p-8 rounded-md">
        <form onSubmit={uploadFile} className="flex flex-col items-center">
          <label htmlFor="fileInput" className="text-white font-bold mb-4">Choose an image:</label>
          <input type="file" onChange={handleFile} name="imageUrl" id="fileInput" className="border-none bg-gray-200 py-2 px-4 rounded-md mb-4" />
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-600">Upload</button>
        </form>
      </div>
      {loading && <div className="mt-4">Loading...</div>}
      {error && <div className="text-red-500 mt-4">Error: {error}</div>} 
      {success && <div className="text-green-500 mt-4">Successfully uploaded</div>}
    </div>
  );
};

export default App;
