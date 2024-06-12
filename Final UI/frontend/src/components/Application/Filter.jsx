import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import '';

const makeRequest = async (prompt) => {
  const res = await axios.post('http://localhost:800/generate', { prompt });
  return res.data;
};

function Filter() {
  const [prompt, setPrompt] = useState("");
  const mutation = useMutation({
    mutationFn: makeRequest,
    mutationKey: ['gemini-api-request']
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="text-4xl font-bold mb-6">Gemini Ai</header>
      <p className="mb-4 text-lg">Enter your prompt</p>
      <form onSubmit={submitHandler} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">Prompt</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write something"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Generate
        </button>
        <section className="mt-4">
          {mutation.isLoading && <p className="text-yellow-500">Generating your content...</p>}
          {mutation.isError && <p className="text-red-500">Error: {mutation.error.message}</p>}
          {mutation.isSuccess && <p className="text-green-500">{mutation.data}</p>}
        </section>
      </form>
    </div>
  );
}

export default Filter;
