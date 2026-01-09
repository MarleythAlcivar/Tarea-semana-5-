document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const gallery = document.getElementById('gallery');
    const imageUrlInput = document.getElementById('imageUrl');
    const addButton = document.getElementById('addButton');
    const deleteButton = document.getElementById('deleteButton');
    
    let selectedImage = null;
    
    // Función para agregar una nueva imagen
    function addImage(url) {
        // Validar URL
        if (!url) return;
        
        // Crear elementos
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Imagen de la galería';
        
        // Agregar evento de clic para seleccionar
        galleryItem.addEventListener('click', () => selectImage(galleryItem));
        
        // Agregar elementos al DOM
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
        
        // Limpiar el input
        imageUrlInput.value = '';
    }
    
    // Función para seleccionar una imagen
    function selectImage(item) {
        // Deseleccionar la imagen actual si existe
        if (selectedImage) {
            selectedImage.classList.remove('selected');
        }
        
        // Seleccionar la nueva imagen
        selectedImage = item;
        selectedImage.classList.add('selected');
        
        // Habilitar el botón de eliminar
        deleteButton.disabled = false;
    }
    
    // Función para eliminar la imagen seleccionada
    function deleteSelectedImage() {
        if (!selectedImage) return;
        
        // Animación de eliminación
        selectedImage.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        // Eliminar después de la animación
        setTimeout(() => {
            gallery.removeChild(selectedImage);
            selectedImage = null;
            deleteButton.disabled = true;
        }, 300);
    }
    
    // Event Listeners
    addButton.addEventListener('click', () => {
        addImage(imageUrlInput.value.trim());
    });
    
    // Agregar imagen al presionar Enter
    imageUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addImage(imageUrlInput.value.trim());
        }
    });
    
    deleteButton.addEventListener('click', deleteSelectedImage);
    
    // Agregar algunas imágenes por defecto (opcional)
    const defaultImages = [
        'https://source.unsplash.com/random/400x400?nature',
        'https://source.unsplash.com/random/400x400?city',
        'https://source.unsplash.com/random/400x400?animals'
    ];
    
    defaultImages.forEach(url => addImage(url));
});
