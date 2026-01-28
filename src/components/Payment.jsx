import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Card, CardContent, Button, Typography, MenuItem, Select } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function UltraPaymentComponent() {
  const [selected, setSelected] = useState(null);
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openQR, setOpenQR] = useState(false);

  const methods = [
    {
      id: 1,
      name: "Debit / Credit Card",
      icon: <CreditCardIcon sx={{ fontSize: 40, color: "#1976d2" }} />, 
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "UPI Payment",
      icon: <SmartphoneIcon sx={{ fontSize: 40, color: "#2ecc71" }} />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      name: "Net Banking",
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "#9b59b6" }} />,
      gradient: "from-purple-500 to-fuchsia-600",
    },
  ];

  const payNow = () => {
    if (!selected) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        background: "linear-gradient(135deg, #1a1c2c, #23263a)",
      }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card sx={{ width: 460, borderRadius: 4, padding: 3, background: "#ffffffd9", backdropFilter: "blur(12px)" }}>
          <CardContent>
            {success ? (
              <motion.div initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="text-center">
                <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png" style={{ width: 120, margin: "auto" }} />
                <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>Payment Successful!</Typography>
              </motion.div>
            ) : loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="text-center p-6">
                <img src="https://cdn-icons-png.flaticon.com/512/189/189792.png" style={{ width: 80, margin: "auto" }} />
                <Typography sx={{ mt: 2 }}>Processing Payment...</Typography>
              </motion.div>
            ) : (
              <>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>Secure Payment</Typography>

                <motion.img
                  src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                  className="mx-auto mb-6"
                  style={{ width: 120 }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />

                <Typography variant="body1" sx={{ textAlign: "center", color: "#444", mb: 3 }}>
                  Choose your payment method
                </Typography>

                <div className="space-y-5">
                  {methods.map((m) => (
                    <motion.div
                      key={m.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelected(m.id);
                        if (m.id === 2) setOpenQR(true);
                      }}
                      className={`cursor-pointer p-4 rounded-2xl shadow-lg border bg-gradient-to-r ${m.gradient} ${selected === m.id ? "ring-4 ring-white" : ""}`}
                    >
                      <div className="flex items-center gap-4 text-white">
                        {m.icon}
                        <p className="text-lg font-semibold">{m.name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selected === 3 && (
                  <div className="mt-4">
                    <Typography sx={{ mb: 1 }}>Select Bank</Typography>
                    <Select fullWidth value={bank} onChange={(e) => setBank(e.target.value)} displayEmpty>
                      <MenuItem value="">Choose Bank</MenuItem>
                      <MenuItem value="SBI">SBI</MenuItem>
                      <MenuItem value="HDFC">HDFC</MenuItem>
                      <MenuItem value="ICICI">ICICI</MenuItem>
                      <MenuItem value="PNB">PNB</MenuItem>
                    </Select>
                  </div>
                )}

                {openQR && selected === 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center bg-white p-4 rounded-2xl shadow-xl mt-4"
                  >
                    <Typography sx={{ mb: 1, fontWeight: "bold" }}>Scan UPI QR</Typography>
                    <img src="https://cdn-icons-png.flaticon.com/512/9408/9408217.png" style={{ width: 150, margin: "auto" }} />
                  </motion.div>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  disabled={!selected}
                  sx={{ mt: 4, py: 1.4, fontSize: "17px", borderRadius: "12px", background: selected ? "#000" : "gray" }}
                  onClick={payNow}
                >
                  Proceed to Pay
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
