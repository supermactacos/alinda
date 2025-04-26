"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import { Navbar } from "@/components/Navbar"
import { Footer } from "../../components/Footer";
import { ArrowLeft, Edit, Trash2, Plus, Save, X, Upload, Key } from "lucide-react";
import { useRouter } from "next/navigation";
import CustomTextArea from "../../components/CustomTextArea";
import SimpleEditor from "../../components/SimpleEditor";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  excerpt?: string;
  image?: string;
  slug: string;
}

interface FormData {
  title: string;
  author: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
}

export default function BlogAdmin() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "Linda R. Olsson",
    content: "",
    excerpt: "",
    image: "",
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Simplified auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginStatus("Logging in...");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setLoginStatus("");
        loadPosts();
      } else {
        setLoginStatus(data.error || "Invalid password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginStatus("Login failed. Please try again.");
    }
  };

  const loadPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create blog post");
      }

      const data = await response.json();
      setPosts(prev => [data.post, ...prev]);
      
      setFormData({
        title: "",
        author: "Linda R. Olsson",
        content: "",
        excerpt: "",
        image: "",
        date: new Date().toISOString().split('T')[0],
      });
      setCreating(false);
      setSuccess("Blog post created successfully!");

      router.refresh();
    } catch (error) {
      console.error("Error creating blog post:", error);
      setError(error instanceof Error ? error.message : "Failed to create blog post");
    }
  };

  const handleUpdatePost = async (e: FormEvent, slug: string | null) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!slug) return;

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update blog post");
      }

      const data = await response.json();
      setPosts(prev => prev.map(post => post.slug === slug ? data.post : post));
      
      setEditing(null);
      setFormData({
        title: "",
        author: "Linda R. Olsson",
        content: "",
        excerpt: "",
        image: "",
        date: new Date().toISOString().split('T')[0],
      });
      setSuccess("Blog post updated successfully!");

      router.refresh();
    } catch (error) {
      console.error("Error updating blog post:", error);
      setError(error instanceof Error ? error.message : "Failed to update blog post");
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete blog post");
      }
      
      setPosts(prev => prev.filter(post => post.slug !== slug));
      setSuccess("Blog post deleted successfully!");

      router.refresh();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      setError(error instanceof Error ? error.message : "Failed to delete blog post");
    }
  };

  const startEditing = (post: BlogPost) => {
    setEditing(post.slug);
    setFormData({
      title: post.title,
      author: post.author,
      content: post.content,
      excerpt: post.excerpt || "",
      image: post.image || "",
      date: new Date(post.date).toISOString().split('T')[0],
    });
  };

  const cancelEditing = () => {
    setEditing(null);
    setFormData({
      title: "",
      author: "Linda R. Olsson",
      content: "",
      excerpt: "",
      image: "",
      date: new Date().toISOString().split('T')[0],
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
          <Navbar isScrolled={true} />
        </div>

        <div className="pt-24 flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className={`text-2xl mb-6 text-center text-green-800 ${instrumentSerif.className}`}>
              Admin Login
            </h2>
            
            {loginStatus && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {loginStatus}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-800 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-[40] w-full bg-[#1b4e1f]">
        <Navbar isScrolled={isScrolled} />
      </div>

      <div className="pt-24 pb-16 bg-[#f8f8f8]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-4xl md:text-5xl font-light text-green-800 ${instrumentSerif.className}`}>
              Blog Admin
            </h1>
            <Link href="/blog" className="inline-flex items-center text-green-800 hover:text-green-700 font-medium">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {!creating && !editing && (
            <button
              onClick={() => setCreating(true)}
              className="mb-8 bg-green-800 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Post
            </button>
          )}

          {creating && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-light text-green-800 ${instrumentSerif.className}`}>
                  Create New Blog Post
                </h2>
                <button
                  onClick={() => setCreating(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleCreatePost}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Publication Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Content</label>
                  <SimpleEditor 
                    value={formData.content}
                    onChange={handleContentChange}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="inline-flex items-center">
                      <Upload className="h-3 w-3 mr-1" /> 
                      Use the toolbar to add headings, format text, add links, and insert images
                    </span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Excerpt (optional)</label>
                  <CustomTextArea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded h-20"
                    placeholder="Enter a brief excerpt for this post"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Featured Image URL (optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="Enter image URL"
                    />
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-400 cursor-not-allowed px-4 py-2 rounded flex items-center gap-2"
                      disabled
                      title="Upload feature coming soon"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="bg-green-800 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Post
                </button>
              </form>
            </div>
          )}

          {editing && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-light text-green-800 ${instrumentSerif.className}`}>
                  Edit Blog Post
                </h2>
                <button
                  onClick={cancelEditing}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={(e) => handleUpdatePost(e, editing)}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Publication Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Content</label>
                  <SimpleEditor 
                    value={formData.content}
                    onChange={handleContentChange}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="inline-flex items-center">
                      <Upload className="h-3 w-3 mr-1" /> 
                      Use the toolbar to add headings, format text, add links, and insert images
                    </span>
                  </p>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Excerpt (optional)</label>
                  <CustomTextArea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded h-20"
                    placeholder="Enter a brief excerpt for this post"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Featured Image URL (optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border border-gray-300 rounded"
                      placeholder="Enter image URL"
                    />
                    <button
                      type="button"
                      className="bg-gray-200 text-gray-400 cursor-not-allowed px-4 py-2 rounded flex items-center gap-2"
                      disabled
                      title="Upload feature coming soon"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="bg-green-800 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Update Post
                </button>
              </form>
            </div>
          )}

          <div>
            <h2 className={`text-2xl font-light mb-4 text-green-800 ${instrumentSerif.className}`}>
              Manage Blog Posts
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <h3 className="text-xl font-medium text-gray-600">No blog posts found</h3>
                <p className="mt-2 text-gray-500">Create your first blog post to get started!</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {post.image && (
                              <div className="flex-shrink-0 h-10 w-10 mr-4">
                                <img className="h-10 w-10 rounded-full object-cover" src={post.image} alt="" />
                              </div>
                            )}
                            <div className={`${post.image ? "" : "ml-4"}`}>
                              <div className="text-sm font-medium text-gray-900">{post.title}</div>
                              <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-green-600 hover:text-green-800">
                                View Post →
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {post.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => startEditing(post)}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.slug)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 