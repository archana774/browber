document.addEventListener('DOMContentLoaded', () => {
    // Get all the HTML elements
    const uploadButton = document.getElementById('upload-button');
    const photoUpload = document.getElementById('photo-upload');
    const uploadSection = document.getElementById('upload-section');
    const tryOnSection = document.getElementById('try-on-section');
    const userPhoto = document.getElementById('user-photo');
    const overlayContainer = document.getElementById('overlay-container');
    const eyebrowOverlay = document.getElementById('eyebrow-overlay');
    const prevStyleButton = document.getElementById('prev-style');
    const nextStyleButton = document.getElementById('next-style');
    const styleName = document.getElementById('style-name');
    const tooltip = document.getElementById('tooltip');
    const countButton = document.getElementById('count-button');

    // ===============================================
    // NEW: Get the new message element
    const pluckResultMessage = document.getElementById('pluck-result-message');
    // ===============================================

    // --- Eyebrow Style Data ---
    const styles = [
        { name: 'Soft Arch', image: 'images/pic1-removebg-preview.png', tooltip: '"Low effort, high slay."' },
        { name: 'Straight', image: 'images/pic2-removebg-preview.png', tooltip: '"Chic, sharp, and to the point."' },
        { name: 'High Arch', image: 'images/pic3-removebg-preview.png', tooltip: '"Warning: Too fierce?"' },
        { name: 'Rounded Fluff', image: 'images/pic4-removebg-preview.png', tooltip: '"Effortlessly cool and fluffy."' }
    ];

    let currentStyleIndex = 0;
    let currentPluckCount = 0;

    // --- Adjustment Variables ---
    let overlayX = 0, overlayY = 0, overlayScale = 1;
    const moveStep = 5, scaleStep = 0.1;

    // --- Event Listeners ---
    uploadButton.addEventListener('click', () => photoUpload.click());

    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userPhoto.src = e.target.result;
                resetAdjustments();
                uploadSection.classList.add('hidden');
                tryOnSection.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    nextStyleButton.addEventListener('click', () => {
        currentStyleIndex = (currentStyleIndex + 1) % styles.length;
        updateStyle();
        resetAdjustments();
    });

    prevStyleButton.addEventListener('click', () => {
        currentStyleIndex = (currentStyleIndex - 1 + styles.length) % styles.length;
        updateStyle();
        resetAdjustments();
    });

    // ===============================================
    // UPDATED: Event Listener for the "Count Hairs" button
    countButton.addEventListener('click', () => {
        // Instead of an alert, we update our new message element
        pluckResultMessage.textContent = `Pluck ${currentPluckCount} hairs for this look!`;
        // And make it visible with a smooth animation
        pluckResultMessage.classList.add('visible');
    });
    // ===============================================

    // --- Functions ---
    function updateStyle() {
        const style = styles[currentStyleIndex];
        eyebrowOverlay.src = style.image;
        styleName.textContent = style.name;
        tooltip.textContent = style.tooltip;
        currentPluckCount = Math.floor(Math.random() * 26) + 5;
    }

    updateStyle();

    // --- Adjustment Controls ---
    const adjustmentButtons = document.querySelectorAll('#adjustment-controls button');
    adjustmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            switch (button.id) {
                case 'move-up': overlayY -= moveStep; break;
                case 'move-down': overlayY += moveStep; break;
                case 'move-left': overlayX -= moveStep; break;
                case 'move-right': overlayX += moveStep; break;
                case 'scale-up': overlayScale += scaleStep; break;
                case 'scale-down': overlayScale -= scaleStep; break;
                case 'reset-adj': resetAdjustments(); return; // Exit after resetting
            }
            applyAdjustments();
        });
    });

    function applyAdjustments() {
        overlayContainer.style.transform = `translate(${overlayX}px, ${overlayY}px) scale(${overlayScale})`;
    }

    function resetAdjustments() {
        overlayX = 0;
        overlayY = 0;
        overlayScale = 1;
        applyAdjustments();
        // Also hide the result message when resetting
        pluckResultMessage.classList.remove('visible');
    }
});
