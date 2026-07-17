import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader2, CheckCircle, ChevronRight } from "lucide-react";

interface Slot {
  id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
}

interface BookingSchedulerProps {
  leadId: string;
}

const BookingScheduler = ({ leadId }: BookingSchedulerProps) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  const [bookingStatus, setBookingStatus] = useState<"idle" | "booking" | "success" | "error">("idle");

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await fetch("/api/scheduler/available");
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();
      setSlots(data.slots || []);
      
      if (data.slots && data.slots.length > 0) {
        // Group by date to find the first available date
        const firstDate = data.slots[0].slot_date;
        setSelectedDate(firstDate);
      }
    } catch (err) {
      setError("Unable to load available times. We will contact you via email.");
    } finally {
      setLoading(false);
    }
  };

  const availableDates = Array.from(new Set(slots.map(s => s.slot_date))).sort();
  const slotsForSelectedDate = slots.filter(s => s.slot_date === selectedDate);

  const handleBook = async () => {
    if (!selectedSlot) return;
    setBookingStatus("booking");
    try {
      const res = await fetch("/api/scheduler/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          slotId: selectedSlot.id,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });
      
      if (!res.ok) throw new Error("Booking failed");
      setBookingStatus("success");
    } catch (err) {
      setBookingStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="animate-spin mb-4" size={32} style={{ color: "var(--nexus-violet)" }} />
        <p className="text-muted-foreground">Checking availability...</p>
      </div>
    );
  }

  if (error || slots.length === 0) {
    return (
      <div className="text-center p-12">
        <h3 className="font-display font-bold text-2xl mb-4">Request Received</h3>
        <p className="text-muted-foreground">
          {error || "Your profile has been prioritized. Our team will email you shortly with booking options."}
        </p>
      </div>
    );
  }

  if (bookingStatus === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-10"
      >
        <CheckCircle size={56} className="mx-auto mb-5" style={{ color: "var(--quantum-lime)" }} />
        <h3 className="font-display font-bold text-2xl text-foreground mb-3">Session Confirmed!</h3>
        <p className="text-muted-foreground text-base mb-6">
          Your Strategy Session is booked for <strong className="text-foreground">{new Date(selectedSlot!.slot_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</strong> at <strong className="text-foreground">{selectedSlot!.start_time.substring(0,5)}</strong>.
        </p>
        <p className="text-sm" style={{ color: "var(--graphite-400)" }}>
          A calendar invitation with meeting details has been sent to your email.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-3" style={{ color: "var(--nexus-violet)", backgroundColor: "rgba(124, 92, 255, 0.1)" }}>
          Priority Access Granted
        </span>
        <h3 className="font-display font-bold text-2xl sm:text-3xl mb-2 text-foreground">Schedule Your Session</h3>
        <p className="text-muted-foreground">Select a time that works best for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar Side */}
        <div className="bg-background/50 rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium flex items-center gap-2 text-foreground"><Calendar size={18} /> Available Dates</h4>
          </div>
          <div className="space-y-2">
            {availableDates.map(date => {
              const dateObj = new Date(date);
              const isSelected = date === selectedDate;
              return (
                <button
                  key={date}
                  onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    isSelected 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-muted text-foreground"
                  }`}
                  style={isSelected ? { backgroundColor: "var(--nexus-violet)", color: "#fff" } : {}}
                >
                  <span>{dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <ChevronRight size={16} className={isSelected ? "opacity-100" : "opacity-0"} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots Side */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h4 className="font-medium flex items-center gap-2 text-foreground"><Clock size={18} /> Select Time</h4>
            <span className="text-xs text-muted-foreground">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {slotsForSelectedDate.map(slot => {
              const isSelected = selectedSlot?.id === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border text-sm text-center font-medium transition-all ${
                    isSelected 
                      ? "border-primary bg-primary/10 text-foreground" 
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                  style={isSelected ? { borderColor: "var(--nexus-violet)", color: "var(--pearl)" } : {}}
                >
                  {slot.start_time.substring(0, 5)}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleBook}
            disabled={!selectedSlot || bookingStatus === "booking"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all disabled:opacity-50"
            style={{
              background: selectedSlot ? "var(--nexus-violet)" : "var(--graphite-600)",
              color: "#fff",
            }}
          >
            {bookingStatus === "booking" ? (
              <><Loader2 size={18} className="animate-spin" /> Confirming...</>
            ) : (
              "Confirm Strategy Session"
            )}
          </button>
          
          {bookingStatus === "error" && (
            <p className="text-destructive text-sm mt-3 text-center">Failed to book slot. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingScheduler;
