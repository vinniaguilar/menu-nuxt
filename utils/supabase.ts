import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://xyxhlgoxpzwrrxjmmpie.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eGhsZ294cHp3cnJ4am1tcGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyODE0MDYsImV4cCI6MjA1Njg1NzQwNn0.-zVcmarPeiBPbn_F0SwSLIscBtbL258LFT38Mr5WsFM'
)
