import { ClipboardList, ExternalLink, Timer, Trophy, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const StudyInvitePopup = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const SURVEY_LINK = t('studyPopup.surveyLink');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-lg bg-slate-950/95 border-white/10 backdrop-blur-xl p-0 overflow-hidden" 
        data-testid="study-invite-popup"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{t('studyPopup.title')}</DialogTitle>
          <DialogDescription>{t('studyPopup.description')}</DialogDescription>
        </DialogHeader>

        {/* Gradient Header */}
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-8 text-center relative">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <ClipboardList size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
            {t('studyPopup.title')}
          </h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            {t('studyPopup.description')}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              {t('studyPopup.rewardTitle')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 bg-gradient-to-r from-cyan-500/15 to-blue-600/10 border border-cyan-500/30 rounded-lg p-3 text-sm">
                <Zap size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="text-white font-semibold">{t('studyPopup.reward1')}</span>
                  <span className="text-cyan-300 text-xs font-medium">Huge Value!</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                <span>{t('studyPopup.reward2')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-3">
            <Timer size={20} className="text-blue-400" />
            <p className="text-blue-100 text-xs font-medium">
              {t('studyPopup.limitation')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={SURVEY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-center no-underline"
              onClick={onClose}
            >
              {t('studyPopup.cta')}
              <ExternalLink size={18} />
            </a>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white text-sm transition-colors py-2"
            >
              {t('studyPopup.close')}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyInvitePopup;
