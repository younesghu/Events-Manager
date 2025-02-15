# Events Manager

## Installation & Setup

## Backend

<p>To get the project up and running, follow these steps:</p>

<ul>
  <li><strong>Clone the repository:</strong></li>

  <pre><code>
git clone https://github.com/younesghu/Events-Manager.git
cd Backend
  </code></pre>

  <li><strong>Install dependencies:</strong></li>

  <pre><code>
composer install
  </code></pre>

  <li><strong>Create a <code>.env</code> file:</strong></li>

  <pre><code>
cp .env.example .env
  </code></pre>

  <p>Set up your environment variables in <code>.env</code> (e.g., database credentials).</p>

  <li><strong>Run the database migrations:</strong></li>

  <pre><code>
php artisan migrate --seed
  </code></pre>

  <li><strong>Start the development server:</strong></li>

  <pre><code>
php artisan serve
  </code></pre>

  <p>The backend should now be running on <code>http://127.0.0.1:8000</code> (default Laravel server).</p>
</ul>

## Frontend

<ul>
  <li><strong>Navigate to the frontend directory:</strong></li>

  <pre><code>
cd Frontend
  </code></pre>

  <li><strong>Install dependencies:</strong></li>

  <pre><code>
npm install
  </code></pre>

  <li><strong>Start the development server:</strong></li>

  <pre><code>
npm run dev
  </code></pre>

  <p>The frontend should now be running on <code>http://localhost:5174</code> (default Vite server).</p>
</ul>
