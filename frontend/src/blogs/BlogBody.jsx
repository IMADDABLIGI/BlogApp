import React, { useState, useEffect } from 'react';
import './BlogBody.css';
import { ThumbsUp, ThumbsDown, User, Briefcase, MessageCircle, AlertCircle, X, Edit, Trash2, Check } from 'lucide-react';
import avatar from '../assets/avatar.png';

const BlogBody = () => {
  // Sample user data (this would come from your backend in a real application)
  const userData = {
    name: "Jane Doe",
    profilePic: "/api/placeholder/80/80",
    position: "Tech Founder",
    company: "InnoTech Solutions",
    followers: 342,
    following: 156,
    articlesCount: 27
  };

  // Articles state (this would interact with API in a real application)
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sample article data for initial load
  const sampleArticles = [
    {
      id: 1,
      author: "Alex Johnson",
      authorRole: "CEO at StartUp Ventures",
      authorPic: "/api/placeholder/48/48",
      date: "April 28, 2025",
      category: "Success Story",
      title: "How We Pivoted Our Business Model During The Pandemic",
      content: "When the pandemic hit, our face-to-face consulting business was devastated. We had to quickly adapt to survive. This is how we transformed our business into a fully digital platform and ended up reaching 3x more clients than before...",
      likes: 124,
      dislikes: 5,
      userLiked: false,
      userDisliked: false,
      ownedByUser: false
    },
    {
      id: 2,
      author: "Sarah Miller",
      authorRole: "Founder at EcoStartup",
      authorPic: "/api/placeholder/48/48",
      date: "April 25, 2025",
      category: "Challenge",
      title: "Seeking Advice: Scaling Manufacturing While Staying Sustainable",
      content: "Our eco-friendly product line has gained traction faster than expected. We're now facing challenges with scaling our manufacturing while maintaining our sustainability commitments. Has anyone navigated this successfully? I'm specifically struggling with finding suppliers that can handle our volume while meeting our ecological standards...",
      likes: 87,
      dislikes: 2,
      userLiked: false,
      userDisliked: false,
      ownedByUser: false
    },
    {
      id: 3,
      author: "Michael Tran",
      authorRole: "CTO at DataFlow",
      authorPic: "/api/placeholder/48/48",
      date: "April 23, 2025",
      category: "Lesson Learned",
      title: "The Costly Mistake of Neglecting Technical Debt",
      content: "Three years into our startup journey, we faced a complete system overhaul because we consistently prioritized new features over addressing our growing technical debt. Here's what happened and what we learned...",
      likes: 215,
      dislikes: 3,
      userLiked: false,
      userDisliked: false,
      ownedByUser: false
    },
    {
      id: 4,
      author: userData.name,
      authorRole: `${userData.position} at ${userData.company}`,
      authorPic: userData.profilePic,
      date: "April 29, 2025",
      category: "Success Story",
      title: "My Journey to Building a Tech Startup",
      content: "Starting InnoTech Solutions was one of the most challenging yet rewarding experiences of my career. I wanted to share some insights from my journey that might help fellow entrepreneurs...",
      likes: 42,
      dislikes: 0,
      userLiked: false,
      userDisliked: false,
      ownedByUser: true
    }
  ];
  
  // Load initial articles (simulating API fetch)
  useEffect(() => {
    // Simulate API fetch delay
    const fetchArticles = async () => {
      try {
        // This is where you would make your API call
        // const response = await fetch('/api/articles');
        // const data = await response.json();
        
        // Simulating API response delay
        setTimeout(() => {
          setArticles(sampleArticles);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  // Handle like/dislike functionality
  const handleReaction = (id, reaction) => {
    setArticles(articles.map(article => {
      if (article.id === id) {
        // If user already liked/disliked, remove their reaction
        if ((reaction === 'like' && article.userLiked) || 
            (reaction === 'dislike' && article.userDisliked)) {
          return {
            ...article,
            likes: reaction === 'like' ? article.likes - 1 : article.likes,
            dislikes: reaction === 'dislike' ? article.dislikes - 1 : article.dislikes,
            userLiked: reaction === 'like' ? false : article.userLiked,
            userDisliked: reaction === 'dislike' ? false : article.userDisliked
          };
        }
        // If user is switching reaction
        else if ((reaction === 'like' && article.userDisliked) || 
                (reaction === 'dislike' && article.userLiked)) {
          return {
            ...article,
            likes: reaction === 'like' ? article.likes + 1 : article.likes - 1,
            dislikes: reaction === 'dislike' ? article.dislikes + 1 : article.dislikes - 1,
            userLiked: reaction === 'like',
            userDisliked: reaction === 'dislike'
          };
        }
        // If user is adding a new reaction
        else {
          return {
            ...article,
            likes: reaction === 'like' ? article.likes + 1 : article.likes,
            dislikes: reaction === 'dislike' ? article.dislikes + 1 : article.dislikes,
            userLiked: reaction === 'like',
            userDisliked: reaction === 'dislike'
          };
        }
      }
      return article;
    }));
    
    // This is where you would call your API to update the reaction
    // Example: await fetch(`/api/articles/${id}/reaction`, { 
    //   method: 'POST', 
    //   body: JSON.stringify({ reaction }) 
    // });
  };
  
  // Handle input changes for the article creation/editing form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value
    });
  };
  
  // Open edit form for an article
  const handleEditArticle = (article) => {
    setArticleToEdit(article);
    setNewArticle({
      title: article.title,
      content: article.content,
      category: article.category
    });
    setIsEditing(true);
    setShowArticleForm(true);
  };
  
  // Prepare to delete an article
  const handleDeletePrompt = (article) => {
    setArticleToDelete(article);
    setShowDeleteConfirm(true);
  };
  
  // Confirm and delete an article
  const confirmDelete = () => {
    if (articleToDelete) {
      // Filter out the article to delete
      setArticles(articles.filter(article => article.id !== articleToDelete.id));
      
      // This is where you would call your API to delete the article
      // Example: await fetch(`/api/articles/${articleToDelete.id}`, { method: 'DELETE' });
      
      setShowDeleteConfirm(false);
      setArticleToDelete(null);
    }
  };
  
  // Cancel article deletion
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setArticleToDelete(null);
  };
  
  // Submit new or updated article
  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing && articleToEdit) {
        // Update existing article
        const updatedArticles = articles.map(article => {
          if (article.id === articleToEdit.id) {
            return {
              ...article,
              title: newArticle.title,
              content: newArticle.content,
              category: newArticle.category,
              // Add an "edited" flag or timestamp if desired
              lastEdited: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            };
          }
          return article;
        });
        
        setArticles(updatedArticles);
        
        // This is where you would call your API to update the article
        // Example: await fetch(`/api/articles/${articleToEdit.id}`, { 
        //   method: 'PUT',
        //   body: JSON.stringify(newArticle) 
        // });
      } else {
        // Create new article object
        const articleToAdd = {
          id: Date.now(), // Temporary ID, would be assigned by backend
          author: userData.name,
          authorRole: userData.position + " at " + userData.company,
          authorPic: userData.profilePic,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          category: newArticle.category,
          title: newArticle.title,
          content: newArticle.content,
          likes: 0,
          dislikes: 0,
          userLiked: false,
          userDisliked: false,
          ownedByUser: true
        };
        
        // Add the new article to the state
        setArticles([articleToAdd, ...articles]);
        
        // This is where you would call your API to create the article
        // Example: await fetch('/api/articles', { 
        //   method: 'POST',
        //   body: JSON.stringify(articleToAdd) 
        // });
        
        // Update user's article count (this would typically be handled by the backend)
        userData.articlesCount += 1;
      }
      
      // Reset form and close it
      resetForm();
    } catch (err) {
      console.error("Error saving article:", err);
      // Handle error, show notification, etc.
    }
  };
  
  // Reset and close form
  const resetForm = () => {
    setNewArticle({
      title: '',
      content: '',
      category: 'Success Story'
    });
    setShowArticleForm(false);
    setIsEditing(false);
    setArticleToEdit(null);
  };

  // Categories for filtering (would be expanded in a real application)
  const categories = ["All", "Success Story", "Challenge", "Lesson Learned", "Advice"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // State for article creation/editing form
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: 'Success Story'
  });
  
  // State for delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  return (
    <div className="blog-body-container">
      {/* Article Creation/Editing Form Modal */}
      {showArticleForm && (
        <div className="article-form-overlay">
          <div className="article-form-container">
            <div className="form-header">
              <h2>{isEditing ? 'Edit Article' : 'Share Your Experience'}</h2>
              <button className="close-form-btn" onClick={resetForm}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleArticleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newArticle.title}
                  onChange={handleInputChange}
                  placeholder="Enter a compelling title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={newArticle.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.filter(cat => cat !== "All").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Your Story</label>
                <textarea
                  id="content"
                  name="content"
                  value={newArticle.content}
                  onChange={handleInputChange}
                  placeholder="Share your experience or ask for advice..."
                  rows="6"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-article-btn">
                {isEditing ? 'Update' : 'Publish'}
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-container">
            <h3>Delete Article</h3>
            <p>Are you sure you want to delete this article? This action cannot be undone.</p>
            <div className="delete-actions">
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
              <button className="delete-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Left Side - User Profile */}
      <div className="user-profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <img src={avatar} alt="Profile" className="profile-pic" />
            <h2 className="user-name">{userData.name}</h2>
            <p className="user-position">{userData.position}</p>
            <div className="company-info">
              <Briefcase size={16} />
              <span>{userData.company}</span>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{userData.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.following}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.articlesCount}</span>
              <span className="stat-label">Articles</span>
            </div>
          </div>
          
          <button className="create-post-btn" onClick={() => setShowArticleForm(true)}>
            Share Your Experience
          </button>
          
          <nav className="side-nav">
            <ul>
              <li className="active"><User size={16} /> My Profile</li>
              <li><MessageCircle size={16} /> My Discussions</li>
              <li><AlertCircle size={16} /> My Challenges</li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Right Side - Blog Articles */}
      <div className="articles-section">
        <div className="articles-header">
          <h1>Innominds Community</h1>
          <p>Entrepreneurs sharing experiences, challenges, and solutions</p>
          
          <div className="category-filters">
            {categories.map(category => (
              <button 
                key={category} 
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="articles-list">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading articles...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-btn" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="no-articles">
              <p>No articles found. Be the first to share your experience!</p>
              <button className="create-post-btn" onClick={() => setShowArticleForm(true)}>
                Share Your Experience
              </button>
            </div>
          ) : (
            articles
              .filter(article => activeCategory === "All" || article.category === activeCategory)
              .map(article => (
                <article key={article.id} className="blog-card">
                  <div className="article-header">
                    <img src={avatar} alt={article.author} className="author-pic" />
                    <div className="article-meta">
                      <h3 className="author-name">{article.author}</h3>
                      <p className="author-role">{article.authorRole}</p>
                      <span className="article-date">{article.date}</span>
                      {article.lastEdited && (
                        <span className="article-edited">(edited {article.lastEdited})</span>
                      )}
                    </div>
                    <span className="article-category">{article.category}</span>
                  </div>
                  
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-content">{article.content}</p>
                  
                  <div className="article-actions">
                    <div className="reaction-actions">
                      <button 
                        className={`reaction-btn ${article.userLiked ? 'active' : ''}`}
                        onClick={() => handleReaction(article.id, 'like')}
                      >
                        <ThumbsUp size={18} /> <span>{article.likes}</span>
                      </button>
                      <button 
                        className={`reaction-btn ${article.userDisliked ? 'active' : ''}`}
                        onClick={() => handleReaction(article.id, 'dislike')}
                      >
                        <ThumbsDown size={18} /> <span>{article.dislikes}</span>
                      </button>
                    </div>
                    
                    {/* Edit/Delete options for articles owned by the user */}
                    {article.ownedByUser && (
                      <div className="owner-actions">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditArticle(article)}
                          title="Edit article"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeletePrompt(article)}
                          title="Delete article"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogBody;