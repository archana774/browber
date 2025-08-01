document.addEventListener('DOMContentLoaded', () => {
    // Get all the HTML elements
    const uploadButton = document.getElementById('upload-button');
    const photoUpload = document.getElementById('photo-upload');
    const uploadSection = document.getElementById('upload-section');
    const tryOnSection = document.getElementById('try-on-section');
    const userPhoto = document.getElementById('user-photo');
    
    // CORRECTED: Get references to both the container and the image inside it
    const overlayContainer = document.getElementById('overlay-container');
    const eyebrowOverlay = document.getElementById('eyebrow-overlay');

    const prevStyleButton = document.getElementById('prev-style');
    const nextStyleButton = document.getElementById('next-style');
    const styleName = document.getElementById('style-name');
    const pluckCount = document.getElementById('pluck-count');
    const tooltip = document.getElementById('tooltip');

    // --- Eyebrow Style Data ---
    const styles = [
        { name: 'Soft Arch', image: 'images/pic1-removebg-preview.png', pluckCount: 17, tooltip: '"Low effort, high slay."' },
        { name: 'Straight', image: 'images/pic2-removebg-preview.png', pluckCount: 24, tooltip: '"Chic, sharp, and to the point."' },
        { name: 'High Arch', image: 'images/pic3-removebg-preview.png', pluckCount: 8, tooltip: '"Warning: Too fierce?"' },
        { name: 'Rounded Fluff', image: 'images/pic4-removebg-preview.png', pluckCount: 12, tooltip: '"Effortlessly cool and fluffy."' }
    ];

    let currentStyleIndex = 0;

    // --- Adjustment Variables ---
    let overlayX = 0;
    let overlayY = 0;
    let overlayScale = 1;
    const moveStep = 5;
    const scaleStep = 0.1;

    // --- Event Listeners ---
    uploadButton.addEventListener('click', () => photoUpload.click());

    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userPhoto.src = e.target.result;
                resetAdjustments(); // Reset position for new photo
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

    // --- Functions ---
    function updateStyle() {
        const style = styles[currentStyleIndex];
        eyebrowOverlay.src = style.image; // Change the image source
        styleName.textContent = style.name;
        pluckCount.textContent = `Pluck ${style.pluckCount} hairs for this look.`;
        tooltip.textContent = style.tooltip;
    }

    // Initialize the app with the first style
    updateStyle();

    // --- Adjustment Controls Event Listeners ---
    document.getElementById('move-up').addEventListener('click', () => {
        overlayY -= moveStep;
        applyAdjustments();
    });
    document.getElementById('move-down').addEventListener('click', () => {
        overlayY += moveStep;
        applyAdjustments();
    });
    document.getElementById('move-left').addEventListener('click', () => {
        overlayX -= moveStep;
        applyAdjustments();
    });
    document.getElementById('move-right').addEventListener('click', () => {
        overlayX += moveStep;
        applyAdjustments();
    });
    document.getElementById('scale-up').addEventListener('click', () => {
        overlayScale += scaleStep;
        applyAdjustments();
    });
    document.getElementById('scale-down').addEventListener('click', () => {
        overlayScale -= scaleStep;
        applyAdjustments();
    });
    document.getElementById('reset-adj').addEventListener('click', resetAdjustments);

    // CORRECTED: Apply the CSS transform to the container div
    function applyAdjustments() {
        overlayContainer.style.transform = `translate(${overlayX}px, ${overlayY}px) scale(${overlayScale})`;
    }

    function resetAdjustments() {
        overlayX = 0;
        overlayY = 0;
        overlayScale = 1;
        applyAdjustments(); // Apply the reset values
    }
});