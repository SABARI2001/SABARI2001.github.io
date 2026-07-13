document.addEventListener('DOMContentLoaded', () => {
    class TypeWriter {
        constructor(element) {
            this.element = element;
            this.words = JSON.parse(element.getAttribute('data-text'));
            this.wait = 2800;
            this.currentWordIndex = 0;
            this.txt = '';
            this.isDeleting = false;
            this.type();
        }

        type() {
            const current = this.currentWordIndex % this.words.length;
            const fullTxt = this.words[current];

            this.txt = this.isDeleting
                ? fullTxt.substring(0, this.txt.length - 1)
                : fullTxt.substring(0, this.txt.length + 1);

            this.element.textContent = this.txt;

            let typeSpeed = this.isDeleting ? 40 : 80;

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.currentWordIndex++;
                typeSpeed = 400;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const typewriterElement = document.querySelector('.typewriter-text');
    if (typewriterElement) {
        new TypeWriter(typewriterElement);
    }
});
