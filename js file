// ১. মোবাইল মেনু টগল করার ফাংশন
function toggleMenu() {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('active');
}

// ২. বর্তমান বছর স্বয়ংক্রিয়ভাবে আপডেট করা
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ৩. যোগাযোগ ফর্ম জমা দেওয়ার ফাংশন (Formspree-এর সাথে AJAX সংযোগ)
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // ফর্ম সাবমিট হতে দেবে না

    const form = event.target;
    const formButton = form.querySelector('button[type="submit"]');

    // ফর্মের ডেটা সংগ্রহ
    const data = new FormData(form);
    
    // বাটনটিকে নিষ্ক্রিয় করে সাবমিট লোডিং স্টেট দেখানো 
    formButton.disabled = true;
    formButton.textContent = "পাঠানো হচ্ছে...";

    try {
        // Formspree-এর সাথে যোগাযোগ করতে fetch API ব্যবহার 
        // HTML এ action="https://formspree.io/f/xkgqaqeq" বসানো আছে
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // ফর্ম সফলভাবে সাবমিট হলে
            alert('ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমি শীঘ্রই আপনার Facebook Ads লক্ষ্য নিয়ে আলোচনা করতে যোগাযোগ করব।');
            form.reset(); // ফর্ম খালি করুন
        } else {
            // ফর্ম সাবমিটে কোনো ত্রুটি হলে
            alert('দুঃখিত! বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে সব তথ্য ঠিকভাবে পূরণ করেছেন কিনা দেখুন।');
        }
    } catch (error) {
        // নেটওয়ার্ক বা অন্য কোনো বড় ত্রুটি হলে
        alert('যোগাযোগের সময় একটি ত্রুটি হয়েছে। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।');
    } finally {
        // সাবমিট শেষ হলে বাটনটিকে আবার সক্রিয় করা
        formButton.disabled = false;
        formButton.textContent = "বার্তা পাঠান";
    }
});

// ৪. নেভিগেশন লিঙ্কে ক্লিক করলে মেনু বন্ধ করা (মোবাইলের জন্য)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const navUl = document.querySelector('nav ul');
        // স্ক্রিন ছোট হলে মেনু বন্ধ করবে
        if (window.innerWidth <= 768) {
            navUl.classList.remove('active');
        }
    });
});
