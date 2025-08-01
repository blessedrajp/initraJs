// CSS template generators

export const getBasicComponentCSS = (componentName: string): string => {
  return `.container {
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.prop {
  padding: 0.5rem;
  background-color: #f9fafb;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  font-family: monospace;
  font-size: 0.875rem;
  color: #374151;
}`;
};

export const getLayoutComponentCSS = (componentName: string): string => {
  return `.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.headerContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.main {
  flex: 1;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  background-color: #1f2937;
  color: #ffffff;
  border-top: 1px solid #374151;
}

.footerContent {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  text-align: center;
}

.footerContent p {
  margin: 0;
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .headerContent {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .container {
    padding: 1rem;
  }
  
  .footerContent {
    padding: 1rem;
  }
}`;
};