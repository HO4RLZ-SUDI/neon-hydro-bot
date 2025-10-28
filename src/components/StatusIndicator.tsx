interface StatusIndicatorProps {
  isOnline: boolean;
}

export function StatusIndicator({ isOnline }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          isOnline ? 'status-online' : 'status-offline'
        }`}
      />
      <span className="text-xs text-muted-foreground">
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
