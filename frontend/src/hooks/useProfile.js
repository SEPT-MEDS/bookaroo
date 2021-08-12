import create from 'zustand'

const useProfile = create(set => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null })
}))

export default useProfile
