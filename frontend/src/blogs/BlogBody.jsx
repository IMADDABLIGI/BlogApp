import React, { useState } from 'react';
import './BlogBody.css';
import avatar from '../assets/avatar.png';
import { ThumbsUp, ThumbsDown, User, Briefcase, MessageCircle, AlertCircle, X } from 'lucide-react';

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

  // Sample blog posts (this would come from your backend in a real application)
  const [articles, setArticles] = useState([
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
    }
  ]);

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
  };
  
  // Handle input changes for the article creation form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle,
      [name]: value
    });
  };
  
  // Submit new article
  const handleArticleSubmit = (e) => {
    e.preventDefault();
    
    // Create new article object
    const articleToAdd = {
      id: articles.length + 1,
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
      userDisliked: false
    };
    
    // Add the new article to the state
    setArticles([articleToAdd, ...articles]);
    
    // Reset form and close it
    setNewArticle({
      title: '',
      content: '',
      category: 'Success Story'
    });
    setShowArticleForm(false);
  };

  // Categories for filtering (would be expanded in a real application)
  const categories = ["All", "Success Story", "Challenge", "Lesson Learned", "Advice"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // State for article creation form
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: 'Success Story'
  });

  return (
    <div className="blog-body-container">
      {/* Article Creation Form Modal */}
      {showArticleForm && (
        <div className="article-form-overlay">
          <div className="article-form-container">
            <div className="form-header">
              <h2>Share Your Experience</h2>
              <button className="close-form-btn" onClick={() => setShowArticleForm(false)}>
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
              
              <button type="submit" className="submit-article-btn">Publish</button>
            </form>
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
          {articles
            .filter(article => activeCategory === "All" || article.category === activeCategory)
            .map(article => (
              <article key={article.id} className="blog-card">
                <div className="article-header">
                  <img src={avatar} alt={article.author} className="author-pic" />
                  <div className="article-meta">
                    <h3 className="author-name">{article.author}</h3>
                    <p className="author-role">{article.authorRole}</p>
                    <span className="article-date">{article.date}</span>
                  </div>
                  <span className="article-category">{article.category}</span>
                </div>
                
                <h2 className="article-title">{article.title}</h2>
                <p className="article-content">{article.content}</p>
                
                <div className="article-actions">
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
              </article>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogBody;