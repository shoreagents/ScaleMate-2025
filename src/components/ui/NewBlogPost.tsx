import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faBold, faItalic, faLink, faListUl, faQuoteRight, faCode, faRobot, faCheck, faMagicWandSparkles, faEye } from '@fortawesome/free-solid-svg-icons';

const tagStyles = (color: string) => ({
  backgroundColor: color === '#0098FF' ? 'rgba(0,152,255,0.1)' : 'rgba(0,233,21,0.1)',
  color,
  borderRadius: '9999px',
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  padding: '0.25rem 0.75rem',
});

const toolbarButtonStyle = {
  padding: 8,
  color: 'rgba(15,23,42,0.7)',
  background: 'none',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 16,
  transition: 'color 0.2s, background 0.2s',
  marginRight: 0,
};

const sidebarCardStyle = {
  background: 'white',
  borderRadius: '0.75rem',
  border: '1px solid #E5E7EB',
  padding: 24,
  marginBottom: 24,
};

const NewBlogPost: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginTop: 0, paddingTop: 0 }}>
      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0, marginTop: 0, paddingTop: 0 }}>
        {/* Basic Info */}
        <div id="basic-info" style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', padding: 24, display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Post Title</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }} placeholder="Enter your blog post title..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Category</label>
              <select style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }}>
                <option>Select Category</option>
                <option>Leadership</option>
                <option>Team Building</option>
                <option>Management</option>
                <option>Technology</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Author</label>
              <select style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }}>
                <option>Sarah Chen</option>
                <option>Mike Wilson</option>
                <option>Admin User</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Tags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              <span style={tagStyles('#0098FF')}>
                remote work
                <button style={{ marginLeft: 8, fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
              </span>
              <span style={tagStyles('#00E915')}>
                leadership
                <button style={{ marginLeft: 8, fontSize: 12, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
              </span>
            </div>
            <input type="text" style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }} placeholder="Add tags (press Enter)" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Schedule Publish</label>
            <input type="datetime-local" style={{ padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }} />
          </div>
        </div>
        {/* Featured Image */}
        <div id="featured-image" style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>Featured Image</h3>
          <div style={{ border: '2px dashed #E5E7EB', borderRadius: '0.75rem', padding: 32, textAlign: 'center' }}>
            <FontAwesomeIcon icon={faImage} style={{ fontSize: 40, color: 'rgba(15,23,42,0.2)', marginBottom: 16 }} />
            <p style={{ color: 'rgba(15,23,42,0.7)', marginBottom: 16 }}>Upload featured image or select from media library</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button style={{ padding: '0.5rem 1rem', background: '#3B82F6', color: 'white', borderRadius: '0.75rem', border: 'none', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.background = '#2563EB')}
                onMouseOut={e => (e.currentTarget.style.background = '#3B82F6')}
              >
                Upload Image
              </button>
              <button style={{ padding: '0.5rem 1rem', border: '1px solid #E5E7EB', color: '#0F172A', borderRadius: '0.75rem', background: 'white', fontWeight: 500, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.background = '#F9FAFB')}
                onMouseOut={e => (e.currentTarget.style.background = 'white')}
              >
                Media Library
              </button>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Alt Text</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }} placeholder="Describe the image for accessibility" />
          </div>
        </div>
        {/* Content Editor */}
        <div id="content-editor" style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A' }}>Content</h3>
            <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
              <button style={{ padding: '0.5rem 1rem', background: '#3B82F6', color: 'white', fontSize: 14, border: 'none', outline: 'none', fontWeight: 500, cursor: 'pointer' }}>Visual Editor</button>
              <button style={{ padding: '0.5rem 1rem', color: 'rgba(15,23,42,0.7)', fontSize: 14, background: 'none', border: 'none', outline: 'none', fontWeight: 500, cursor: 'pointer' }}>HTML Code</button>
            </div>
          </div>
          <div style={{ border: '1px solid #E5E7EB', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 12, background: '#F9FAFB', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faBold} /></button>
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faItalic} /></button>
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faLink} /></button>
            <div style={{ width: 1, height: 24, background: '#E5E7EB' }} />
            <select style={{ padding: '0.25rem 0.75rem', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 14 }}>
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>
            <div style={{ width: 1, height: 24, background: '#E5E7EB' }} />
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faListUl} /></button>
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faQuoteRight} /></button>
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faCode} /></button>
            <button style={toolbarButtonStyle}><FontAwesomeIcon icon={faImage} /></button>
            <div style={{ marginLeft: 'auto' }}>
              <button style={{ padding: '0.25rem 0.75rem', background: '#3B82F6', color: 'white', borderRadius: 8, fontSize: 14, border: 'none', display: 'flex', alignItems: 'center', fontWeight: 500, cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faRobot} style={{ marginRight: 8 }} />
                AI Assist
              </button>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #E5E7EB', borderRight: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: 16, minHeight: 400, background: 'white' }}>
            <div>
              <p style={{ color: 'rgba(15,23,42,0.4)' }}>Start writing your blog post content here...</p>
            </div>
          </div>
        </div>
        {/* SEO & Metadata */}
        <div id="seo-section" style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #E5E7EB', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>SEO & Metadata</h3>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>SEO Title</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }} placeholder="SEO optimized title" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Meta Description</label>
            <textarea style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem', fontFamily: 'inherit', fontSize: '1rem' }} rows={3} placeholder="Brief description for search engines (160 characters max)" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#0F172A', marginBottom: 8 }}>Keywords</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.75rem' }} placeholder="Comma-separated keywords" />
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}>
              <input type="checkbox" style={{ marginRight: 8 }} defaultChecked />
              <span style={{ fontSize: '0.875rem', color: '#0F172A' }}>Allow search engines to index this post</span>
            </label>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div id="editor-sidebar" style={{ 
        width: 320, 
        flexShrink: 0,  // Prevent sidebar from shrinking
        position: 'sticky', 
        top: 24,  // Adjust top position
        alignSelf: 'flex-start',  // Align to top of container
        maxHeight: 'calc(100vh - 48px)',  // Prevent overflow
        overflowY: 'auto',  // Allow scrolling if content is too tall
        padding: 0,  // Remove padding from sticky container
        display: 'flex', 
        flexDirection: 'column', 
        gap: 24
      }}>
        {/* Status Card */}
        <div style={sidebarCardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>Post Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'rgba(15,23,42,0.7)' }}>Status:</span>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: 9999, background: 'rgba(236,41,123,0.1)', color: '#EC297B', fontSize: '0.875rem' }}>Draft</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'rgba(15,23,42,0.7)' }}>Word Count:</span>
              <span style={{ fontSize: '0.875rem', color: '#0F172A' }}>0 words</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'rgba(15,23,42,0.7)' }}>Read Time:</span>
              <span style={{ fontSize: '0.875rem', color: '#0F172A' }}>0 min</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'rgba(15,23,42,0.7)' }}>Last Saved:</span>
              <span style={{ fontSize: '0.875rem', color: '#0F172A' }}>Auto-saving...</span>
            </div>
          </div>
        </div>
        {/* Writing Tips */}
        <div style={sidebarCardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>Writing Tips</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.875rem', color: 'rgba(15,23,42,0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#00E915', marginRight: 8, marginTop: 4 }} />
              <span>Use clear, engaging headlines</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#00E915', marginRight: 8, marginTop: 4 }} />
              <span>Include relevant keywords naturally</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#00E915', marginRight: 8, marginTop: 4 }} />
              <span>Break content into digestible sections</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faCheck} style={{ color: '#00E915', marginRight: 8, marginTop: 4 }} />
              <span>Add relevant images and media</span>
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div style={sidebarCardStyle}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#0F172A', marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button style={{ width: '100%', padding: '0.5rem 1rem', background: '#3B82F6', color: 'white', borderRadius: '0.75rem', border: 'none', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background = '#2563EB')}
              onMouseOut={e => (e.currentTarget.style.background = '#3B82F6')}
            >
              <FontAwesomeIcon icon={faMagicWandSparkles} style={{ marginRight: 8 }} />
              Suggest Tags
            </button>
            <button style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', color: '#0F172A', borderRadius: '0.75rem', background: 'white', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background = '#F9FAFB')}
              onMouseOut={e => (e.currentTarget.style.background = 'white')}
            >
              <FontAwesomeIcon icon={faRobot} style={{ marginRight: 8 }} />
              AI Write Summary
            </button>
            <button style={{ width: '100%', padding: '0.5rem 1rem', border: '1px solid #E5E7EB', color: '#0F172A', borderRadius: '0.75rem', background: 'white', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'background 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.background = '#F9FAFB')}
              onMouseOut={e => (e.currentTarget.style.background = 'white')}
            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: 8 }} />
              Preview Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlogPost; 