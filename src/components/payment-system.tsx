'use client';

import { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Lock,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Clock,
  Shield,
  Wallet,
  Building,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatCurrency } from '@/lib/platform-utils';

interface PaymentSystemProps {
  type: 'tip' | 'service' | 'video_call' | 'custom_content';
  amount: number;
  recipientName: string;
  serviceName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transactionId: string) => void;
}

export function PaymentSystem({
  type,
  amount,
  recipientName,
  serviceName,
  isOpen,
  onClose,
  onSuccess
}: PaymentSystemProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success' | 'error'>('details');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const platformFee = amount * 0.029 + 0.30; // 2.9% + $0.30 standard rate
  const tipAmount = amount * (tipPercentage / 100);
  const totalAmount = amount + platformFee + tipAmount;

  const handlePayment = async () => {
    setStep('processing');

    // Mock payment processing
    setTimeout(() => {
      if (cardNumber === '4000000000000002') {
        setErrorMessage('Your card was declined. Please try another payment method.');
        setStep('error');
      } else {
        const transactionId = `txn_${Date.now()}`;
        setStep('success');
        setTimeout(() => {
          onSuccess(transactionId);
          onClose();
          setStep('details');
        }, 2000);
      }
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const getPaymentTypeTitle = () => {
    switch (type) {
      case 'tip':
        return 'Send Tip';
      case 'service':
        return 'Book Service';
      case 'video_call':
        return 'Schedule Video Call';
      case 'custom_content':
        return 'Order Custom Content';
      default:
        return 'Payment';
    }
  };

  const getPaymentTypeIcon = () => {
    switch (type) {
      case 'tip':
        return <Star className="h-5 w-5 text-creator-secondary" />;
      case 'service':
        return <Calendar className="h-5 w-5 text-creator-primary" />;
      case 'video_call':
        return <Clock className="h-5 w-5 text-creator-primary" />;
      case 'custom_content':
        return <DollarSign className="h-5 w-5 text-creator-primary" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getPaymentTypeIcon()}
            {getPaymentTypeTitle()}
          </DialogTitle>
        </DialogHeader>

        {step === 'details' && (
          <div className="space-y-6">
            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">To:</span>
                  <span className="text-sm font-medium">{recipientName}</span>
                </div>
                {serviceName && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Service:</span>
                    <span className="text-sm font-medium">{serviceName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                </div>
                {type === 'service' && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm">Add tip (optional)</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 10, 15, 20].map((percentage) => (
                          <Button
                            key={percentage}
                            variant={tipPercentage === percentage ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTipPercentage(percentage)}
                          >
                            {percentage === 0 ? 'None' : `${percentage}%`}
                          </Button>
                        ))}
                      </div>
                      {tipPercentage > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tip ({tipPercentage}%):</span>
                          <span className="font-medium">{formatCurrency(tipAmount)}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform fee:</span>
                  <span className="font-medium">{formatCurrency(platformFee)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total:</span>
                  <span className="text-creator-primary">{formatCurrency(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => setStep('payment')}>
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="space-y-3">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                  <RadioGroupItem value="paypal" id="paypal" disabled />
                  <Label htmlFor="paypal" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    PayPal
                    <Badge variant="outline" className="text-xs">Soon</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                  <RadioGroupItem value="bank" id="bank" disabled />
                  <Label htmlFor="bank" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Bank Transfer
                    <Badge variant="outline" className="text-xs">Soon</Badge>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        setExpiryDate(value);
                      }}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input
                    id="nameOnCard"
                    placeholder="John Doe"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveCard"
                    checked={saveCard}
                    onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                  />
                  <Label htmlFor="saveCard" className="text-sm">
                    Save this card for future payments
                  </Label>
                </div>
              </div>
            )}

            {/* Security Notice */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Your payment information is encrypted and secure. We never store your card details.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handlePayment}
                disabled={!cardNumber || !expiryDate || !cvv || !nameOnCard}
              >
                <Lock className="h-4 w-4 mr-2" />
                Pay {formatCurrency(totalAmount)}
              </Button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-creator-primary"></div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we process your payment securely...
              </p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground">
                Your payment of {formatCurrency(totalAmount)} has been processed successfully.
              </p>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Payment Failed</h3>
                <p className="text-sm text-muted-foreground">{errorMessage}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setStep('payment')}>
                Try Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Transaction History Component
export function TransactionHistory({ userId, userType }: { userId: string; userType: 'creator' | 'client' }) {
  const mockTransactions = [
    {
      id: 'txn_1',
      date: '2024-10-06',
      type: 'service' as const,
      amount: 150,
      status: 'completed' as const,
      description: 'Custom Photo Set',
      otherParty: userType === 'creator' ? 'Client User' : 'Isabella Rose'
    },
    {
      id: 'txn_2',
      date: '2024-10-05',
      type: 'tip' as const,
      amount: 25,
      status: 'completed' as const,
      description: 'Tip',
      otherParty: userType === 'creator' ? 'Another Client' : 'Sophia Chen'
    },
    {
      id: 'txn_3',
      date: '2024-10-04',
      type: 'video_call' as const,
      amount: 80,
      status: 'pending' as const,
      description: '30-minute video call',
      otherParty: userType === 'creator' ? 'Client User 2' : 'Mia Rodriguez'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-creator-primary/10 rounded-full flex items-center justify-center">
                  {transaction.type === 'service' && <Calendar className="h-4 w-4 text-creator-primary" />}
                  {transaction.type === 'tip' && <Star className="h-4 w-4 text-creator-secondary" />}
                  {transaction.type === 'video_call' && <Clock className="h-4 w-4 text-creator-primary" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {userType === 'creator' ? 'From' : 'To'}: {transaction.otherParty}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {userType === 'creator' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <Badge
                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}