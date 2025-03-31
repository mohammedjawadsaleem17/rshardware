import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://tbqbqawwopbjvkdqehpz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRicWJxYXd3b3BianZrZHFlaHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTg0MDYsImV4cCI6MjA1ODk5NDQwNn0.bkFhKCEmFT0x7ojyRwoMAebw5KOKBchv9OrJgdjyXRk'
);



getInvoiceNumber();