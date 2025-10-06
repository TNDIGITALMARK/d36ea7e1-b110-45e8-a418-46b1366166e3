'use client';

import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  UserX,
  Flag,
  Phone,
  CheckCircle,
  XCircle,
  Lock,
  Eye,
  MessageSquare,
  Ban,
  Camera,
  Video,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportUserDialogProps {
  userName: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: ReportData) => void;
}

interface ReportData {
  reason: string;
  description: string;
  evidence?: File[];
}

export function ReportUserDialog({ userName, userId, isOpen, onClose, onSubmit }: ReportUserDialogProps) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const reportReasons = [
    { value: 'inappropriate_content', label: 'Inappropriate Content', description: 'Sharing explicit or offensive material' },
    { value: 'harassment', label: 'Harassment or Bullying', description: 'Threatening, intimidating, or abusive behavior' },
    { value: 'spam', label: 'Spam or Scam', description: 'Sending unsolicited messages or fraudulent requests' },
    { value: 'impersonation', label: 'Impersonation', description: 'Pretending to be someone else' },
    { value: 'underage', label: 'Underage User', description: 'User appears to be under 18' },
    { value: 'violence', label: 'Violence or Threats', description: 'Threats of violence or harmful content' },
    { value: 'privacy', label: 'Privacy Violation', description: 'Sharing personal information without consent' },
    { value: 'other', label: 'Other', description: 'Something else that violates our guidelines' }
  ];

  const handleSubmit = () => {
    if (!reason || !description.trim()) return;

    onSubmit({
      reason,
      description,
      evidence
    });

    // Reset form
    setReason('');
    setDescription('');
    setEvidence([]);
    setIsAnonymous(false);
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setEvidence(prev => [...prev, ...files]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-500" />
            Report {userName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Reports are taken seriously and reviewed by our safety team. False reports may result in account restrictions.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label>What's happening?</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reportReasons.map((reportReason) => (
                <div key={reportReason.value} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={reportReason.value} id={reportReason.value} />
                    <Label htmlFor={reportReason.value} className="font-medium">
                      {reportReason.label}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {reportReason.description}
                  </p>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Additional Details</Label>
            <Textarea
              placeholder="Please provide specific details about what happened. Include dates, times, and context if relevant."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-3">
            <Label>Evidence (Optional)</Label>
            <div className="space-y-2">
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium"
              />
              <p className="text-xs text-muted-foreground">
                Upload screenshots, images, or videos that support your report. Max 5 files, 10MB each.
              </p>
              {evidence.length > 0 && (
                <div className="space-y-1">
                  {evidence.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {file.type.startsWith('image/') ? (
                        <Camera className="h-4 w-4" />
                      ) : (
                        <Video className="h-4 w-4" />
                      )}
                      <span>{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEvidence(prev => prev.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Submit this report anonymously
            </Label>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={handleSubmit}
              disabled={!reason || !description.trim()}
            >
              Submit Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface BlockUserDialogProps {
  userName: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
}

export function BlockUserDialog({ userName, userId, isOpen, onClose, onConfirm }: BlockUserDialogProps) {
  const [reason, setReason] = useState('');

  const handleBlock = () => {
    onConfirm(reason);
    setReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-red-500" />
            Block {userName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Blocking this user will prevent them from messaging you, viewing your profile, or booking your services.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Reason for blocking (Optional)</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="inappropriate">Inappropriate behavior</SelectItem>
                <SelectItem value="spam">Spam messages</SelectItem>
                <SelectItem value="no_longer_interested">No longer interested</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={handleBlock}>
              Block User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function PhoneVerificationDialog({ isOpen, onClose, onVerify }: {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (phone: string) => void;
}) {
  const [phone, setPhone] = useState('');
  const [carrier, setCarrier] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'phone' | 'verify' | 'success'>('phone');

  const carriers = [
    'Verizon',
    'AT&T',
    'T-Mobile',
    'Metro by T-Mobile',
    'Boost Mobile',
    'Cricket Wireless',
    'Visible',
    'Mint Mobile'
  ];

  const handleSendCode = () => {
    if (!phone || !carrier) return;
    // Mock sending verification code
    setStep('verify');
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') {
      setStep('success');
      setTimeout(() => {
        onVerify(phone);
        onClose();
        setStep('phone');
        setPhone('');
        setCarrier('');
        setVerificationCode('');
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-creator-primary" />
            Phone Verification
          </DialogTitle>
        </DialogHeader>

        {step === 'phone' && (
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                We only accept verified carrier numbers (no VOIP) to ensure platform safety.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Carrier</Label>
              <Select value={carrier} onValueChange={setCarrier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your carrier" />
                </SelectTrigger>
                <SelectContent>
                  {carriers.map((c) => (
                    <SelectItem key={c} value={c.toLowerCase()}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSendCode}
                disabled={!phone || !carrier}
              >
                Send Code
              </Button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                We've sent a verification code to {phone}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Didn't receive the code? Check your messages or try again in 60 seconds.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep('phone')}>
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 6}
              >
                Verify
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Phone Verified!</h3>
              <p className="text-sm text-muted-foreground">
                Your phone number has been successfully verified.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SafetyCenter() {
  const [reportDialog, setReportDialog] = useState(false);
  const [blockDialog, setBlockDialog] = useState(false);
  const [verificationDialog, setVerificationDialog] = useState(false);

  const safetyFeatures = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: 'Identity Verification',
      description: 'All creators undergo identity verification',
      status: 'active'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone Verification',
      description: 'Only verified carrier numbers accepted',
      status: 'active'
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'Content Moderation',
      description: '24/7 AI and human content review',
      status: 'active'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'Message Filtering',
      description: 'Automatic detection of inappropriate content',
      status: 'active'
    },
    {
      icon: <Ban className="h-5 w-5" />,
      title: 'Block & Report',
      description: 'Easy tools to block and report users',
      status: 'active'
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Privacy Controls',
      description: 'Control who can contact and view you',
      status: 'active'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-creator-primary" />
            Safety & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-creator-primary">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                  {feature.status === 'active' ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </>
                  ) : (
                    'Inactive'
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2"
          onClick={() => setReportDialog(true)}
        >
          <Flag className="h-6 w-6 text-red-500" />
          <div className="text-center">
            <div className="font-medium">Report User</div>
            <div className="text-xs text-muted-foreground">Report inappropriate behavior</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2"
          onClick={() => setBlockDialog(true)}
        >
          <UserX className="h-6 w-6 text-orange-500" />
          <div className="text-center">
            <div className="font-medium">Block User</div>
            <div className="text-xs text-muted-foreground">Prevent user from contacting you</div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2"
          onClick={() => setVerificationDialog(true)}
        >
          <Phone className="h-6 w-6 text-creator-primary" />
          <div className="text-center">
            <div className="font-medium">Verify Phone</div>
            <div className="text-xs text-muted-foreground">Verify your phone number</div>
          </div>
        </Button>
      </div>

      {/* Dialogs */}
      <ReportUserDialog
        userName="Example User"
        userId="user123"
        isOpen={reportDialog}
        onClose={() => setReportDialog(false)}
        onSubmit={(report) => console.log('Report submitted:', report)}
      />

      <BlockUserDialog
        userName="Example User"
        userId="user123"
        isOpen={blockDialog}
        onClose={() => setBlockDialog(false)}
        onConfirm={(reason) => console.log('User blocked:', reason)}
      />

      <PhoneVerificationDialog
        isOpen={verificationDialog}
        onClose={() => setVerificationDialog(false)}
        onVerify={(phone) => console.log('Phone verified:', phone)}
      />
    </div>
  );
}