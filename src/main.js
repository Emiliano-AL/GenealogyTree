import './style.css'
import daxcsaData from './Daxcsa.json'

class GenealogyTree {
  constructor(container, data) {
    this.container = container
    this.data = data
    this.currentRoot = data.data.attributes[0]
    this.history = []
    this.maxLevels = window.innerWidth < 768 ? 3 : 5 // Mobile: 3 levels, Desktop: 5 levels
    
    this.init()
  }

  init() {
    this.render()
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
      this.maxLevels = window.innerWidth < 768 ? 3 : 5
      this.render()
    })
  }

  render() {
    this.container.innerHTML = this.generateTreeHTML(this.currentRoot, 0)
    this.attachNodeEventListeners()
  }

  generateTreeHTML(node, level) {
    if (!node || level >= this.maxLevels) return ''

    const hasChildren = node.children && node.children.length > 0
    const leftChild = hasChildren ? node.children.find(child => child.binary_placement === 'Left') : null
    const rightChild = hasChildren ? node.children.find(child => child.binary_placement === 'Right') : null

    return `
      <div class="tree-node-container">
        <div class="tree-node ${this.getNodeClass(node)}" data-distributor-id="${node.distributor_id}">
          <div class="node-content">
            <div class="node-header">
              <span class="node-name">${this.truncateName(node.full_name)}</span>
              <span class="node-status ${node.status.toLowerCase()}">${node.status}</span>
            </div>
            <div class="node-details">
              <div class="detail-item">
                <span class="label">Username:</span>
                <span class="value">${node.username}</span>
              </div>
              <div class="detail-item">
                <span class="label">Product:</span>
                <span class="value">${node.product_name || 'N/A'}</span>
              </div>
              <div class="detail-item">
                <span class="label">Category:</span>
                <span class="value">${node.category_name || 'N/A'}</span>
              </div>
              <div class="detail-item">
                <span class="label">Children:</span>
                <span class="value">${node.num_children}</span>
              </div>
            </div>
            <div class="node-actions">
              ${hasChildren ? '<button class="btn-expand" title="View Children">👥</button>' : ''}
              ${node.parent_username ? '<button class="btn-parent" title="View Parent">⬆️</button>' : ''}
            </div>
          </div>
        </div>
        
        ${hasChildren ? `
          <div class="children-container">
            <div class="children-line"></div>
            <div class="children-nodes">
              ${leftChild ? `
                <div class="child-branch left-branch">
                  <div class="branch-line"></div>
                  ${this.generateTreeHTML(leftChild, level + 1)}
                </div>
              ` : '<div class="child-branch left-branch empty"></div>'}
              
              ${rightChild ? `
                <div class="child-branch right-branch">
                  <div class="branch-line"></div>
                  ${this.generateTreeHTML(rightChild, level + 1)}
                </div>
              ` : '<div class="child-branch right-branch empty"></div>'}
            </div>
          </div>
        ` : ''}
      </div>
    `
  }

  getNodeClass(node) {
    let classes = ['bg-white rounded-xl shadow-lg p-4 m-2 min-w-[280px] max-w-[320px] cursor-pointer transition-all duration-300 border-2 border-transparent relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl']
    
    // Add gradient top border
    classes.push('before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600')
    
    if (node.status === 'Active') classes.push('border-green-500')
    if (node.num_children > 100) classes.push('border-orange-500')
    if (node.num_children > 500) classes.push('border-red-500')
    
    return classes.join(' ')
  }

  truncateName(name) {
    return name.length > 20 ? name.substring(0, 20) + '...' : name
  }

  attachNodeEventListeners() {
    // Expand to children
    this.container.querySelectorAll('.btn-expand').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const nodeElement = btn.closest('.tree-node')
        const distributorId = parseInt(nodeElement.dataset.distributorId)
        this.navigateToChildren(distributorId)
      })
    })

    // Navigate to parent
    this.container.querySelectorAll('.btn-parent').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const nodeElement = btn.closest('.tree-node')
        const distributorId = parseInt(nodeElement.dataset.distributorId)
        this.navigateToParent(distributorId)
      })
    })

    // Node click for details
    this.container.querySelectorAll('.tree-node').forEach(node => {
      node.addEventListener('click', (e) => {
        if (!e.target.closest('.node-actions')) {
          this.showNodeDetails(parseInt(node.dataset.distributorId))
        }
      })
    })
  }

  findNodeById(id, node = this.data.data.attributes[0]) {
    if (node.distributor_id === id) return node
    
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNodeById(id, child)
        if (found) return found
      }
    }
    
    return null
  }

  findParentById(id, node = this.data.data.attributes[0], parent = null) {
    if (node.children) {
      for (const child of node.children) {
        if (child.distributor_id === id) return parent || node
        const found = this.findParentById(id, child, node)
        if (found) return found
      }
    }
    return null
  }

  navigateToChildren(distributorId) {
    const node = this.findNodeById(distributorId)
    if (node && node.children && node.children.length > 0) {
      this.history.push(this.currentRoot)
      this.currentRoot = node
      this.render()
      this.updateBreadcrumb()
    }
  }

  navigateToParent(distributorId) {
    const parent = this.findParentById(distributorId)
    if (parent) {
      this.history.push(this.currentRoot)
      this.currentRoot = parent
      this.render()
      this.updateBreadcrumb()
    }
  }

  showNodeDetails(distributorId) {
    const node = this.findNodeById(distributorId)
    if (node) {
      this.showModal(node)
    }
  }

  showModal(node) {
    const modal = document.createElement('div')
    modal.className = 'modal-overlay'
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div class="bg-gradient-to-tl from-cyan-300 from-25% via-sky-900 via-100% text-white p-6 flex justify-between items-center">
          <h2 class="text-xl font-semibold m-0">${node.full_name}</h2>
          <button class="modal-close bg-transparent border-none text-white text-2xl cursor-pointer p-0 w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-white hover:bg-opacity-10">×</button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div class="grid gap-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Distributor ID:</span>
              <span class="text-gray-900 md:col-span-2">${node.distributor_id}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Username:</span>
              <span class="text-gray-900 md:col-span-2 break-words">${node.username}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Full Name:</span>
              <span class="text-gray-900 md:col-span-2 break-words">${node.full_name}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Status:</span>
              <span class="md:col-span-2 ${node.status.toLowerCase() === 'active' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}">${node.status}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Product:</span>
              <span class="text-gray-900 md:col-span-2 break-words">${node.product_name || 'N/A'}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Category:</span>
              <span class="text-gray-900 md:col-span-2 break-words">${node.category_name || 'N/A'}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Number of Children:</span>
              <span class="text-gray-900 md:col-span-2">${node.num_children}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
              <span class="font-semibold text-gray-700">Binary Placement:</span>
              <span class="text-gray-900 md:col-span-2">${node.binary_placement}</span>
            </div>
            ${node.parent_username ? `
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg">
                <span class="font-semibold text-gray-700">Parent Username:</span>
                <span class="text-gray-900 md:col-span-2 break-words">${node.parent_username}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `

    document.body.appendChild(modal)

    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
      document.body.removeChild(modal)
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal)
      }
    })
  }

  updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb')
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <span class="text-blue-500 cursor-pointer px-2 py-1 rounded transition-colors hover:bg-blue-50" onclick="window.tree.navigateToRoot()">Root</span>
        ${this.history.map((node, index) => `
          <span class="text-gray-400">→</span>
          <span class="text-blue-500 cursor-pointer px-2 py-1 rounded transition-colors hover:bg-blue-50" onclick="window.tree.navigateToHistory(${index})">${this.truncateName(node.full_name)}</span>
        `).join('')}
        <span class="text-gray-400">→</span>
        <span class="text-gray-800 font-semibold cursor-default px-2 py-1">${this.truncateName(this.currentRoot.full_name)}</span>
      `
    }
  }

  navigateToRoot() {
    this.history = []
    this.currentRoot = this.data.data.attributes[0]
    this.render()
    this.updateBreadcrumb()
  }

  navigateToHistory(index) {
    this.history = this.history.slice(0, index)
    this.currentRoot = this.history.length > 0 ? this.history[this.history.length - 1] : this.data.data.attributes[0]
    this.render()
    this.updateBreadcrumb()
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  
  app.innerHTML = `
    <div class="min-h-screen flex flex-col bg-gradient-to-tr from-cyan-800 from- via-sky-800 via-100%">
      <header class="bg-white bg-opacity-95 backdrop-blur-md p-4 md:p-6 shadow-lg">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 m-0">Daxcsa Genealogy Tree</h1>
          <div class="flex gap-2 flex-wrap justify-center">
            <button id="btn-reset" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md">Reset to Root</button>
            <button id="btn-toggle-view" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md">Toggle View</button>
          </div>
        </div>
      </header>
      
      <nav class="bg-white bg-opacity-90 p-3 md:p-4 border-b border-gray-200">
        <div class="max-w-7xl mx-auto">
          <div id="breadcrumb" class="flex items-center flex-wrap gap-2 text-sm"></div>
        </div>
      </nav>
      
      <main class="flex-1 p-4 md:p-8 overflow-auto">
        <div class="max-w-7xl mx-auto">
          <div id="tree-root" class="flex justify-center min-h-[400px]"></div>
        </div>
      </main>
      
      <footer class="bg-white bg-opacity-90 p-4 text-center text-gray-600 text-sm border-t border-gray-200">
        <p class="m-0">Click on nodes to view details • Use navigation buttons to explore the tree</p>
      </footer>
    </div>
  `

  const treeContainer = document.getElementById('tree-root')
  const tree = new GenealogyTree(treeContainer, daxcsaData)
  
  // Make tree globally accessible for breadcrumb navigation
  window.tree = tree
  
  // Initialize breadcrumb
  tree.updateBreadcrumb()
  
  // Setup global controls
  document.getElementById('btn-reset').addEventListener('click', () => {
    tree.navigateToRoot()
  })
  
  document.getElementById('btn-toggle-view').addEventListener('click', () => {
    tree.maxLevels = tree.maxLevels === 3 ? 5 : 3
    tree.render()
  })
})


