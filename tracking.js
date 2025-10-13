// User tracking and journey logging
class UserTracker {
  constructor() {
    this.storageKey = 'soka-ai-pathways-user';
    this.journeyKey = 'soka-ai-pathways-journey';
    this.initUser();
  }

  initUser() {
    let user = this.getUser();
    if (!user) {
      // Generate anonymous ID
      user = {
        id: 'anon-' + Math.random().toString(36).substr(2, 9),
        name: null,
        anonymous: true,
        startTime: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
    return user;
  }

  getUser() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  setUserName(name) {
    const user = this.getUser();
    user.name = name.trim();
    user.anonymous = !name.trim();
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logVisit(nodeId, nodePath, nodeTitle) {
    const journey = this.getJourney();
    const visit = {
      nodeId,
      nodePath,
      nodeTitle,
      timestamp: new Date().toISOString()
    };
    journey.push(visit);
    localStorage.setItem(this.journeyKey, JSON.stringify(journey));
  }

  getJourney() {
    const data = localStorage.getItem(this.journeyKey);
    return data ? JSON.parse(data) : [];
  }

  clearJourney() {
    localStorage.removeItem(this.journeyKey);
  }

  resetUser() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.journeyKey);
    this.initUser();
  }

  exportJourney() {
    const user = this.getUser();
    const journey = this.getJourney();
    return {
      user,
      journey,
      exportedAt: new Date().toISOString()
    };
  }

  downloadJourney() {
    const data = this.exportJourney();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `soka-ai-pathways-journey-${data.user.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const tracker = new UserTracker();

