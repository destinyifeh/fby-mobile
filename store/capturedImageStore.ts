let _capturedUri: string | null = null;

export function setCapturedImageUri(uri: string): void {
  _capturedUri = uri;
}

export function getCapturedImageUri(): string | null {
  return _capturedUri;
}
