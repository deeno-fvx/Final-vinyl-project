# Vinyl Store Web Project - First Year  

### **The Project**  
This is my first-year web development project - a real test of what I've learned so far. For my school course, I needed to build a functional website from scratch, and I decided to challenge myself with an online vinyl store. It's got all the basic shop features: product listings, a working shopping cart, and even an admin panel to manage inventory.  

When I first started this project, I was honestly pretty nervous. Six months ago I barely knew how to write HTML or log something to the console, and now I was expected to build something that actually works? But piece by piece, it all came together.  

### **Why a Vinyl Store?**  
I've always loved browsing record store websites - there's something about the way they showcase album art and organize music that just feels right. Most beginner projects are generic "product sites", but I wanted to build something I'd actually enjoy working on. This was the perfect chance to combine my growing coding skills with my love for music. 
(listened to every song on the page at least 100 times) 

### **My Coding Journey**  
Coming into this with only about 6 months of programming experience was... intimidating to say the least. JavaScript in particular had me dripping in sweat - all those functions, comparisons, and JSON data made my head spin at the start.  

But you know what? After wrestling with localStorage for days, debugging endless cart issues, and finally getting that admin panel to work, I can honestly say I had fun. There's something magical about seeing your code actually do what it's supposed to (eventually...).  

Some key things I learned:  
- How to actually use localStorage (easier than it seems)  
- The importance of proper data comparison (=== is your BFF)  
- That satisfying moment when dynamic loading works perfectly  
- Why planning your data structure matters

### **How It All Works**  

#### **The Main Shop Page**  
The heart of the site - where all the vinyl magic happens. I wanted it clean and easy to use, with:  
- A simple navigation bar (no one likes getting lost)  
- Search and filter functions (search your heart out)  
- Dynamically loaded product cards (no hardcoded HTML here!)  

Each product shows:  
- The album cover (the most important part)  
- Title and artist (also important)  
- Price and stock status (practical stuff)  

**The Struggles Were Real:**  
Getting products to load properly took way more trial and error than I'd like to admit. And don't get me started on the cart issues -  it kept adding duplicate items instead of increasing quantities. Turns out JavaScript objects don't like being compared casually! 
That one took me a while to figure out.

#### **The Shopping Cart**  
Keeping the same clean design as the main page, the cart had to be functional but simple:  
- Shows all your selected items (or makes you feel bad when empty)  
- Calculates the total automatically (I don't like math so I make code do it)  
- Lets you remove items or empty the whole cart (no regrets... maybe)  

I used CSS class states (like display: none) to toggle between "empty cart" messages and the actual cart contents. It's a small touch, but it makes the experience much smoother.

#### **The Admin Panel**  
This was both exciting and terrifying to build - actual power over the store!  
Features:  
- Adding new records (mostly albums from my wishlist) 
- Removing products (goodbye, testing items!)
- Managing stock status (because sometimes things sell out, at least I hope)

No password protection yet... was too lazy to type in a password everytime for testing purposes... definitely not because I was too lazy to add it.

# 🎧 Vinyl Store Web Project - First Year

### 📝 The Project  
This is my first-year web development project – a real test of what I've learned so far. For my school course, I needed to build a functional website from scratch, and I decided to challenge myself with an online vinyl store. It's got all the basic shop features: product listings, a working shopping cart, and even an admin panel to manage inventory.

When I first started this project, I was honestly pretty nervous. Six months ago I barely knew how to write HTML or log something to the console, and now I was expected to build something that actually works? But piece by piece, it all came together.

---

### 🎵 Why a Vinyl Store?  
I've always loved browsing record store websites – there's something about the way they showcase album art and organize music that just feels right. Most beginner projects are generic "product sites", but I wanted to build something I'd actually enjoy working on. This was the perfect chance to combine my growing coding skills with my love for music.  
_(Listened to every song on the page at least 100 times...)_

---

### 👨‍💻 My Coding Journey  
Coming into this with only about 6 months of programming experience was... intimidating. JavaScript in particular had me sweating – all those functions, comparisons, and JSON data made my head spin at the start.

But after wrestling with `localStorage`, debugging endless cart issues, and finally getting the admin panel to work, I can honestly say I had fun.

#### 💡 Key things I learned:
- How to actually use `localStorage` (easier than it seems)
- The importance of proper data comparison (`===` is your BFF)
- That satisfying moment when dynamic loading works perfectly
- Why planning your data structure matters

---

### 🛍️ How It All Works

#### 🏪 The Main Shop Page
The heart of the site – where all the vinyl magic happens:
- Simple navigation bar (no one likes getting lost)
- Search and filter functions
- Dynamically loaded product cards (no hardcoded HTML!)

Each product shows:
- 🎨 Album cover  
- 🎶 Title and artist  
- 💰 Price and stock status  

**Challenges:**  
Getting products to load properly took a lot of trial and error. The cart kept adding duplicates instead of updating quantities — turns out JS objects don’t compare easily. Learned that the hard way.

---

#### 🛒 The Shopping Cart
A functional yet clean cart design:
- Shows all selected items (or a sad empty message)
- Calculates the total automatically
- Remove items or clear the cart entirely

I used CSS class toggling (`display: none`) to switch between the "empty cart" message and the cart contents. Small touch, big difference.

---

#### The Admin Panel
This was both exciting and terrifying to build – real power over the store!

Features:
- Add new records (mostly from my wishlist)
- Remove products
- Manage stock status

No password protection... yet. Testing convenience > security (for now).


### Behind the Scenes (Tech Stack)

Here’s what powers the site:

#### Core Technologies
- **HTML** – For structure (because `<div>` is life)
- **CSS** – Flexbox & Grid for layout (centering divs is still black magic)
- **JavaScript (Vanilla)** – Pure, unfiltered JS. No frameworks.
- **JSON** – Stores all product data

#### 💾 Data Handling
- **localStorage** – Persists cart and product data across sessions
- **Dynamic DOM updates** – No page reloads needed to reflect changes

#### Hosting
- **Netlify** – Every project deserves a home on the internet  
  [🔗 Live Site](https://your-netlify-link.netlify.app)


### 💻 Running It Locally

Want to try it out or break it for fun?

1. **Download or clone the project**
   ```bash
   git clone https://github.com/your-username/vinyl-store.git
   cd vinyl-store


### **Final Thoughts**  
Looking back at this project, I'm honestly surprised at how much I was able to build in just a few months of learning. There were moments of frustration (why won't this work?!) but also moments of pure joy (IT WORKED!).
The learning I had to do to understand all the new stuff I was using was intense but in the end I know more! +100xp

This project taught me that coding isn't just about memorizing syntax - it's about problem-solving, patience, and being okay with breaking things until they finally work.

### Fun Facts:
12 projects were made and 1 worked, in total around 40 files.
In the process 10 keyboards were broken and 1 brain was fried.
