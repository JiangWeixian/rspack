use std::{collections::HashMap, sync::Arc};

use once_cell::sync::Lazy;
use tokio::sync::RwLock;

use crate::utils::decl::{ClientImports, ServerReferenceManifest};

pub static SHARED_DATA: Lazy<Arc<RwLock<ServerReferenceManifest>>> =
  Lazy::new(|| Arc::new(RwLock::default()));
// Collected client imports, group by entry name or route chunk name
pub static SHARED_CLIENT_IMPORTS: Lazy<Arc<RwLock<ClientImports>>> =
  Lazy::new(|| Arc::new(RwLock::default()));
pub static SHARED_SERVER_IMPORTS: Lazy<Arc<RwLock<ClientImports>>> =
  Lazy::new(|| Arc::new(RwLock::default()));
pub static ASSETS_HASH: Lazy<Arc<RwLock<HashMap<String, String>>>> =
  Lazy::new(|| Arc::new(RwLock::default()));
