BEGIN TRANSACTION;

CREATE TABLE bookings_replacement (
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

INSERT INTO bookings_replacement (
  id,
  service_type,
  full_name,
  email,
  phone,
  address,
  booking_date,
  booking_time,
  square_footage,
  notes,
  status,
  created_at
)
SELECT
  id,
  service_type,
  full_name,
  email,
  phone,
  address,
  booking_date,
  booking_time,
  square_footage,
  notes,
  CASE status WHEN 'confirmed' THEN 'booked' ELSE status END,
  created_at
FROM bookings;

DROP TABLE bookings;
ALTER TABLE bookings_replacement RENAME TO bookings;
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at);

COMMIT;
