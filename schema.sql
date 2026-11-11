CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('commercial', 'industrial', 'move_in_out')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  booking_date TEXT NOT NULL,
  booking_time TEXT NOT NULL CHECK (booking_time IN ('09:00-12:00', '13:00-16:00')),
  square_footage TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'booked', 'cancelled')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at);
