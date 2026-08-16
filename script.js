console.log("Début du script panier");
console.log("cartIcon trouvé ?", document.getElementById('cartIcon'));
console.log("cartCount trouvé ?", document.getElementById('cartCount'));
console.log("cartModal trouvé ?", document.getElementById('cartModal'));
// Test manuel : ouvrez la console et tapez ceci :
// document.getElementById('cartIcon').click()

// ============================================
// MENU MOBILE - VERSION CORRIGÉE
// ============================================

const openNav = document.querySelector(".icon1");
const FermerNav = document.querySelector(".fermer");
const Menu = document.querySelector(".menu");

// On supprime la condition inutile sur la position
// On ouvre/ferme simplement le menu

openNav.addEventListener("click", function() {
    Menu.classList.toggle("monter");
});

FermerNav.addEventListener("click", function() {
    Menu.classList.remove("monter");
});

console.log("✅ Menu mobile corrigé !");

// DOM Elements
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const loadingSpinner = document.getElementById('loadingSpinner');
const formMessages = document.getElementById('formMessages');



// Fermer le modal
if (closeModal) {
  closeModal.addEventListener('click', () => {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
  });
}

// Fermer en cliquant en dehors
window.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
  }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && contactModal.style.display === 'block') {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
  }
});

// Réinitialiser le formulaire
function resetForm() {
  if (contactForm) {
    contactForm.reset();
    // Effacer les messages d'erreur
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    // Cacher les messages
    formMessages.style.display = 'none';
  }
}

// Validation du formulaire
function validateForm() {
  let isValid = true;
  
  // Validation du nom
  const name = document.getElementById('name').value.trim();
  const nameError = document.getElementById('nameError');
  if (name.length < 2) {
    nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
    isValid = false;
  } else {
    nameError.textContent = '';
  }
  
  // Validation de l'email
  const email = document.getElementById('email').value.trim();
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Veuillez entrer un email valide';
    isValid = false;
  } else {
    emailError.textContent = '';
  }
  
  // Validation du message
  const message = document.getElementById('message').value.trim();
  const messageError = document.getElementById('messageError');
  if (message.length < 10) {
    messageError.textContent = 'Le message doit contenir au moins 10 caractères';
    isValid = false;
  } else {
    messageError.textContent = '';
  }
  
  // Validation de la case à cocher
  const consent = document.getElementById('consent').checked;
  const consentError = document.getElementById('consentError');
  if (!consent) {
    consentError.textContent = 'Vous devez accepter les conditions';
    isValid = false;
  } else {
    consentError.textContent = '';
  }
  
  return isValid;
}

// Envoyer le formulaire
// ============================================
// FORMULAIRE CONTACT - DÉSACTIVÉ DANS script.js
// (Le script est maintenant dans le HTML)
// ============================================
console.log("⚠️ Le formulaire est géré par le script dans le HTML");
    
    // Afficher le chargement
    submitBtn.disabled = true;
    submitText.textContent = 'Envoi en cours...';
    formMessages.style.display = 'none';
    
    // Préparer les données POUR PHP
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value.trim());
    formData.append('email', document.getElementById('email').value.trim());
    formData.append('subject', document.getElementById('subject').value.trim() || 'Message depuis E-Shikina');
    formData.append('message', document.getElementById('message').value.trim());
    
    try {
  // SIMULATION POUR DÉMO
  console.log("Données du formulaire:", {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  });
  
  // Simulation d'envoi (2 secondes)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Message de succès pour démo
  formMessages.className = 'success';
  formMessages.textContent = '✅ Démonstration : Message envoyé avec succès !';
  formMessages.style.display = 'block';
  
  // Réinitialiser
  contactForm.reset();
  
  // Fermer après 3 secondes
  setTimeout(() => {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
  }, 3000);
  
} catch (error) {
  formMessages.className = 'error';
  formMessages.textContent = '❌ Erreur de simulation';
  formMessages.style.display = 'block';
} finally {
  submitBtn.disabled = false;
  submitText.textContent = 'Envoyer le message';
  loadingSpinner.style.display = 'none';
}
  });
  
  // Validation en temps réel
  contactForm.addEventListener('input', (e) => {
    const field = e.target.name;
    if (field) {
      const errorElement = document.getElementById(`${field}Error`);
      if (errorElement) {
        errorElement.textContent = '';
      }
    }
  });
}

// Variables
let cart = JSON.parse(localStorage.getItem('eshikina_cart')) || [];

// Initialisation SIMPLE
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Panier initialisé");
    updateCartCount();
    setupCart();
});

// Configuration de base
function setupCart() {
    console.log("🔧 Configuration du panier...");
    
    // 1. Trouver l'icône panier
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    
    console.log("Icône panier:", cartIcon);
    console.log("Modal panier:", cartModal);
    
    // 2. Ajouter l'événement CLICK sur l'icône
    if (cartIcon) {
        console.log("✅ Icône panier trouvée, ajout événement click");
        
        // Méthode 1: onclick direct (plus fiable)
        cartIcon.onclick = function(e) {
            console.log("🖱️ Clic sur l'icône panier !");
            e.preventDefault();
            e.stopPropagation();
            openCart();
        };
        
        // Méthode 2: addEventListener en plus
        cartIcon.addEventListener('click', function(e) {
            console.log("Événement addListener déclenché");
            e.preventDefault();
            openCart();
        });
        
        // TEST: Ajouter un style pour voir si c'est cliquable
        cartIcon.style.cursor = 'pointer';
        cartIcon.title = "Voir le panier";
    } else {
        console.error("❌ ERREUR: Icône panier non trouvée !");
        console.log("Cherchez l'élément avec id='cartIcon'");
    }
    
    // 3. Bouton fermer le panier
    if (closeCart) {
        closeCart.onclick = function() {
            document.getElementById('cartModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    
    // 4. Fermer en cliquant en dehors
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('cartModal');
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 5. Boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            console.log("➕ Ajout au panier:", this.dataset.name);
            
            addToCart(
                this.dataset.id,
                this.dataset.name,
                this.dataset.price,
                this.dataset.image
            );
        };
    });
}

// Ouvrir le panier - FONCTION ESSENTIELLE
function openCart() {
    console.log("🚀 Fonction openCart appelée");
    
    const cartModal = document.getElementById('cartModal');
    if (!cartModal) {
        console.error("❌ Modal panier non trouvé !");
        return;
    }
    
    console.log("📦 Panier contient:", cart.length, "articles");
    
    // Afficher le modal
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Remplir le panier
    renderCart();
}

// Remplir le panier
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItems) {
        console.error("❌ cartItems non trouvé !");
        return;
    }
    
    // Vide
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class='bx bx-cart'></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '0 ar';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }
    
    // Calcul total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = total.toLocaleString() + ' ar';
    if (checkoutBtn) checkoutBtn.disabled = false;
    
    // Générer HTML
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <div class="item-price">${item.price.toLocaleString()} ar</div>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                    <button class="remove-item">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Ajouter événements
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.onclick = function() {
            const itemId = this.closest('.cart-item').dataset.id;
            updateQuantity(itemId, -1);
        };
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.onclick = function() {
            const itemId = this.closest('.cart-item').dataset.id;
            updateQuantity(itemId, 1);
        };
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.onclick = function() {
            const itemId = this.closest('.cart-item').dataset.id;
            removeFromCart(itemId);
        };
    });
}

// Ajouter au panier
function addToCart(id, name, price, image) {
    // Chercher si existe déjà
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            image: image,
            quantity: 1
        });
    }
    
    // Sauvegarder
    localStorage.setItem('eshikina_cart', JSON.stringify(cart));
    
    // Mettre à jour compteur
    updateCartCount();
    
    // Notification
    showNotification(name + ' ajouté !');
    
    // Animation compteur
    const count = document.getElementById('cartCount');
    if (count) {
        count.style.animation = 'none';
        setTimeout(() => count.style.animation = 'bounce 0.3s ease', 10);
    }
}

// Mettre à jour compteur
function updateCartCount() {
    const countElement = document.getElementById('cartCount');
    if (countElement) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.textContent = total;
        countElement.style.display = total > 0 ? 'flex' : 'none';
    }
}

// Mettre à jour quantité
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            removeFromCart(id);
        } else {
            localStorage.setItem('eshikina_cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
}

// Supprimer article
function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index > -1) {
        const name = cart[index].name;
        cart.splice(index, 1);
        localStorage.setItem('eshikina_cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
        showNotification(name + ' retiré');
    }
}

// Notification
function showNotification(text) {
    const notification = document.getElementById('cartNotification');
    if (notification) {
        notification.querySelector('span').textContent = text;
        notification.style.display = 'flex';
        setTimeout(() => notification.style.display = 'none', 2000);
    }
}

// === FONCTIONS DE TEST (pour la console) ===

// Test manuel: tapez dans la console: testOuvrirPanier()
window.testOuvrirPanier = function() {
    console.log("Test: ouverture manuelle du panier");
    openCart();
};

// Test: tapez dans la console: testAjouterProduit()
window.testAjouterProduit = function() {
    console.log("Test: ajout produit test");
    addToCart('test-1', 'Produit Test', '15000', '');
    openCart();
};

// Voir le panier: tapez dans la console: voirPanier()
window.voirPanier = function() {
    console.log("Panier actuel:", cart);
    console.log("Total articles:", cart.reduce((s, i) => s + i.quantity, 0));
};

// === BOUTON COMMANDER (avec ariary) ===
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('checkoutBtn');
    
    if (!btn) {
        console.error("❌ Bouton Commander non trouvé !");
        return;
    }
    
    btn.addEventListener('click', function() {
        // 1. Récupérer le panier
        const cart = JSON.parse(localStorage.getItem('eshikina_cart')) || [];
        
        // 2. Vérifier si le panier est vide
        if (cart.length === 0) {
            alert('🛒 Votre panier est vide !\nAjoutez des produits avant de commander.');
            return;
        }
        
        // 3. Calculer le total en ariary
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // 4. Afficher un récapitulatif
        let recap = '📦 Récapitulatif de votre commande\n\n';
        recap += 'Articles :\n';
        cart.forEach(item => {
            recap += `  • ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ar\n`;
        });
        recap += `\nTotal : ${total.toLocaleString()} ar`;
        recap += `\n\nSouhaitez-vous confirmer cette commande ?`;
        
        if (!confirm(recap)) {
            return; // L'utilisateur a annulé
        }
        
        // 5. Animation du bouton
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Traitement en cours...';
        btn.disabled = true;
        btn.style.background = '#FF9800';
        
        // 6. Simulation d'envoi (2 secondes)
        setTimeout(function() {
            // Succès
            btn.innerHTML = '✅ Commande validée !';
            btn.style.background = '#28a745';
            
            alert('✅ Commande confirmée avec succès !\n\n' +
                  'Merci pour votre confiance.\n' +
                  'Un email de confirmation vous sera envoyé.\n\n' +
                  '📦 Total : ' + total.toLocaleString() + ' ar\n' +
                  '📦 Articles : ' + totalItems);
            
            // Vider le panier
            localStorage.removeItem('eshikina_cart');
            
            // Mettre à jour l'affichage
            if (typeof updateCartCount === 'function') updateCartCount();
            if (typeof renderCart === 'function') renderCart();
            
            // Fermer le panier après 1.5 secondes
            setTimeout(function() {
                const modal = document.getElementById('cartModal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
                
                // Réinitialiser le bouton
                btn.innerHTML = '<i class="bx bx-credit-card"></i> Commander';
                btn.disabled = false;
                btn.style.background = 'linear-gradient(135deg, #28a745, #218838)';
            }, 1500);
            
        }, 2000);
    });
});